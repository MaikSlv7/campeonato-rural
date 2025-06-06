
const jogos = [];

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
