import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { insertLead } from "./db";
import { notifyOwner } from "./_core/notification";
import { sendEmail, generateThankYouEmailHTML } from "./_core/emailService";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leads: router({
    submitLead: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Nome é obrigatório"),
          email: z.string().email("E-mail inválido"),
          phone: z.string().min(10, "Telefone inválido"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Save lead to database
          const result = await insertLead(input);

          // Send notification email to owner with lead details
          await notifyOwner({
            title: "Novo Lead Recebido - Matrix 360",
            content: `Um novo lead foi cadastrado no site Matrix 360 Energia que Transforma.\n\nNome: ${input.name}\nE-mail: ${input.email}\nTelefone: ${input.phone}\n\nPor favor, entre em contato com este lead para oferecer os serviços da Matrix 360.`,
          });

          // Send thank you email to the lead
          const thankYouHTML = generateThankYouEmailHTML(input.name);
          await sendEmail({
            to: input.email,
            subject: "Bem-vindo à Matrix 360 - Energia que Transforma! 🎉",
            html: thankYouHTML,
          });

          console.log(`[LEAD] Novo lead cadastrado: ${input.name} (${input.email}) - ${input.phone}`);
          console.log(`[EMAIL] Email de obrigado enviado para ${input.email}`);

          return {
            success: true,
            leadId: result.id,
          };
        } catch (error) {
          console.error("Error submitting lead:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Erro ao cadastrar lead",
          });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
