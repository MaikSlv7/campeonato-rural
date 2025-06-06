
const times = [];
const jogadores = [];
const jogos = [];

// Cadastro de times
document.getElementById('formTime').addEventListener('submit', function(e) {
  e.preventDefault();
  const nomeTime = document.getElementById('nomeTime').value.trim();
  if (nomeTime && !times.includes(nomeTime)) {
    times.push(nomeTime);
    atualizarListaTimes();
    atualizarSelectTimes();
  }
  document.getElementById('formTime').reset();
});

// Cadastro de jogadores
document.getElementById('formJogador').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nomeJogador').value.trim();
  const posicao = document.getElementById('posicaoJogador').value.trim();
  const numero = document.getElementById('numeroJogador').value.trim();
  const time = document.getElementById('selectTime').value;
  if (nome && posicao && numero && time) {
    jogadores.push({ nome, posicao, numero, time });
    atualizarListaJogadores();
  }
  document.getElementById('formJogador').reset();
});

// Cadastro de jogos
document.getElementById('formJogo').addEventListener('submit', function(e) {
  e.preventDefault();
  const timeA = document.getElementById('timeA').value.trim();
  const timeB = document.getElementById('timeB').value.trim();
  const data = document.getElementById('dataJogo').value;
  const hora = document.getElementById('horaJogo').value;
  const aoVivo = document.getElementById('aoVivo').checked;
  if (timeA && timeB && data && hora) {
    jogos.push({ timeA, timeB, data, hora, golsA: 0, golsB: 0, aoVivo });
    atualizarListaJogos();
  }
  document.getElementById('formJogo').reset();
});

function atualizarListaTimes() {
  const lista = document.getElementById('listaTimes');
  lista.innerHTML = '';
  times.forEach(time => {
    const li = document.createElement('li');
    li.textContent = time;
    lista.appendChild(li);
  });
}

function atualizarSelectTimes() {
  const select = document.getElementById('selectTime');
  select.innerHTML = '<option value="" disabled selected>Selecione um time</option>';
  times.forEach(time => {
    const option = document.createElement('option');
    option.value = time;
    option.textContent = time;
    select.appendChild(option);
  });
}

function atualizarListaJogadores() {
  const lista = document.getElementById('listaJogadores');
  lista.innerHTML = '';
  jogadores.forEach(jogador => {
    const li = document.createElement('li');
    li.textContent = `${jogador.nome} - ${jogador.posicao} - ${jogador.numero} - ${jogador.time}`;
    lista.appendChild(li);
  });
}

function atualizarListaJogos() {
  const lista = document.getElementById('listaJogos');
  lista.innerHTML = '';
  jogos.forEach((jogo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${jogo.timeA} ${jogo.golsA} x ${jogo.golsB} ${jogo.timeB}</strong>
      <br>📅 ${jogo.data} ⏰ ${jogo.hora}
      ${jogo.aoVivo ? "<span style='color:red; font-weight:bold;'> AO VIVO</span>" : ""}
      <br>
      <button onclick="atualizarGols(${index}, 'A')">+ Gol ${jogo.timeA}</button>
      <button onclick="atualizarGols(${index}, 'B')">+ Gol ${jogo.timeB}</button>
      <button onclick="finalizarJogo(${index})">Finalizar Jogo</button>
    `;
    lista.appendChild(li);
  });
}

function atualizarGols(index, time) {
  if (time === 'A') jogos[index].golsA++;
  if (time === 'B') jogos[index].golsB++;
  atualizarListaJogos();
}

function finalizarJogo(index) {
  jogos[index].aoVivo = false;
  atualizarListaJogos();
}
