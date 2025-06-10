// Login
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const senha = document.getElementById('senha').value;
  if (senha === 'admin123') {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('admin-content').style.display = 'block';
  } else {
    alert('Senha incorreta!');
  }
});

// Carregar times nos selects
function carregarTimes() {
  db.ref('times').on('value', (snapshot) => {
    const selects = document.querySelectorAll('#selectTime, #timeA, #timeB');
    
    selects.forEach(select => {
      select.innerHTML = '<option value="">Selecione um time</option>';
      
      snapshot.forEach((childSnapshot) => {
        const time = childSnapshot.val();
        const option = document.createElement('option');
        option.value = time.nome;
        option.textContent = time.nome;
        select.appendChild(option);
      });
    });
  });
}

// Cadastro de times
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

// Listar times com edição/exclusão
function listarTimes() {
  db.ref('times').on('value', (snapshot) => {
    const listaTimes = document.getElementById('listaTimes');
    listaTimes.innerHTML = '<h3>Times Cadastrados</h3><ul id="times-list"></ul>';
    const ul = document.getElementById('times-list');
    ul.innerHTML = '';
    
    snapshot.forEach((childSnapshot) => {
      const time = childSnapshot.val();
      const li = document.createElement('li');
      li.innerHTML = `
        ${time.nome}
        <button class="btn-editar" data-key="${childSnapshot.key}">Editar</button>
        <button class="btn-excluir" data-key="${childSnapshot.key}">Excluir</button>
      `;
      ul.appendChild(li);
    });
  });
}

// Editar/Excluir times
document.getElementById('listaTimes').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-editar')) {
    const key = e.target.dataset.key;
    const novoNome = prompt('Digite o novo nome do time:');
    if (novoNome) {
      db.ref(`times/${key}`).update({ nome: novoNome });
    }
  }
  
  if (e.target.classList.contains('btn-excluir')) {
    if (confirm('Tem certeza que deseja excluir este time?')) {
      const key = e.target.dataset.key;
      db.ref(`times/${key}`).remove();
    }
  }
});

// Cadastro de jogadores
document.getElementById('formJogador').addEventListener('submit', async (e) => {
  e.preventDefault();
  const jogador = {
    nome: document.getElementById('nomeJogador').value.trim(),
    posicao: document.getElementById('posicaoJogador').value.trim(),
    numero: document.getElementById('numeroJogador').value.trim(),
    time: document.getElementById('selectTime').value,
    gols: 0
  };

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

// Cadastro de jogos
document.getElementById('formJogo').addEventListener('submit', (e) => {
  e.preventDefault();
  const jogo = {
    timeA: document.getElementById('timeA').value,
    timeB: document.getElementById('timeB').value,
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

// Inicialização
carregarTimes();
listarTimes();
