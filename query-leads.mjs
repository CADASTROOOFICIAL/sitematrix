import { getDb } from './server/db.ts';
import { leads } from './drizzle/schema.ts';
import { desc } from 'drizzle-orm';

async function queryLeads() {
  try {
    const db = await getDb();
    if (!db) {
      console.log('Erro: Banco de dados não disponível');
      process.exit(1);
    }

    const result = await db.select().from(leads).orderBy(desc(leads.id)).limit(5);
    
    console.log('\n=== ÚLTIMOS 5 LEADS CADASTRADOS ===\n');
    
    if (result.length === 0) {
      console.log('Nenhum lead cadastrado ainda.');
    } else {
      result.forEach((lead, index) => {
        const data = new Date(lead.createdAt).toLocaleString('pt-BR');
        console.log(`Lead #${index + 1}:`);
        console.log(`  ID: ${lead.id}`);
        console.log(`  Nome: ${lead.name}`);
        console.log(`  E-mail: ${lead.email}`);
        console.log(`  Telefone: ${lead.phone}`);
        console.log(`  Data: ${data}`);
        console.log('');
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Erro ao consultar leads:', error.message);
    process.exit(1);
  }
}

queryLeads();
