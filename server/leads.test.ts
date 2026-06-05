import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database and notification functions
vi.mock("./db", () => ({
  insertLead: vi.fn(async (lead) => ({
    id: 1,
    ...lead,
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(async () => true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("leads.submitLead", () => {
  it("should submit a lead with valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.submitLead({
      name: "João Silva",
      email: "joao@example.com",
      phone: "(47) 99744-2391",
    });

    expect(result).toEqual({
      success: true,
      leadId: 1,
    });
  });

  it("should reject lead with missing name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.leads.submitLead({
        name: "",
        email: "joao@example.com",
        phone: "(47) 99744-2391",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("should reject lead with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.leads.submitLead({
        name: "João Silva",
        email: "invalid-email",
        phone: "(47) 99744-2391",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("should reject lead with invalid phone", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.leads.submitLead({
        name: "João Silva",
        email: "joao@example.com",
        phone: "123",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });
});
