
const times = [];
const jogadores = [];

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
