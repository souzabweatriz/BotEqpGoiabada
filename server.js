import { createServer } from 'http';
import { spawn } from 'child_process';

const PORT = process.env.PORT || 3000;

// Criar servidor HTTP
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('🤖 Bot WhatsApp Online e Funcionando!\n\nStatus: Ativo ✅');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor HTTP rodando na porta ${PORT}`);
  
  // Iniciar o bot depois que o servidor estiver rodando
  const bot = spawn('node', ['dados/src/.scripts/start.js'], {
    stdio: 'inherit',
    shell: false
  });

  bot.on('error', (error) => {
    console.error('Erro ao iniciar o bot:', error);
  });

  bot.on('exit', (code) => {
    console.log(`Bot encerrado com código ${code}`);
  });
});

// Tratamento de erros
process.on('uncaughtException', (error) => {
  console.error('Erro não capturado:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Rejeição não tratada:', reason);
});
