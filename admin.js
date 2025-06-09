// Cadastro de times com verificação de existência
document.getElementById('formTime').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('nomeTime').value.trim();
  if (!nome) return;

  const snapshot = await db.ref('times').orderByChild('nome').equalTo(nome).once('value');
  if (snapshot.exists()) {
    alert('Time já cadastrado!');
    return;
  }

  db.ref('times').push({ nome });
  e.target.reset();
});

// Cadastro de jogadores com verificação de número
document.getElementById('formJogador').addEventListener('submit', async (e) => {
  e.preventDefault();
  const jogador = {
    nome: document.getElementById('nomeJogador').value.trim(),
    posicao: document.getElementById('posicaoJogador').value.trim(),
    numero: document.getElementById('numeroJogador').value.trim(),
    time: document.getElementById('selectTime').value,
    gols: 0
  };

  // Verifica se número já existe no time
  const snapshot = await db.ref('jogadores')
    .orderByChild('time').equalTo(jogador.time)
    .once('value');
  
  let numeroExistente = false;
  snapshot.forEach(child => {
    if (child.val().numero === jogador.numero) {
      numeroExistente = true;
    }
  });

  if (numeroExistente) {
    alert('Já existe um jogador com este número no time selecionado!');
    return;
  }

  db.ref('jogadores').push(jogador);
  e.target.reset();
});

// Cadastro de jogos com validações
document.getElementById('formJogo').addEventListener('submit', (e) => {
  e.preventDefault();
  const jogo = {
    timeA: document.getElementById('timeA').value.trim(),
    timeB: document.getElementById('timeB').value.trim(),
    data: document.getElementById('dataJogo').value,
    hora: document.getElementById('horaJogo').value,
    aoVivo: document.getElementById('aoVivo').checked,
    golsA: 0,
    golsB: 0,
    finalizado: false
  };

  if (jogo.timeA === jogo.timeB) {
    alert('Um time não pode jogar contra si mesmo!');
    return;
  }

  const hoje = new Date().toISOString().split('T')[0];
  if (jogo.data < hoje) {
    alert('Data do jogo não pode ser no passado!');
    return;
  }

  db.ref('jogos').push(jogo);
  e.target.reset();
});
