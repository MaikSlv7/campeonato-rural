 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/admin.js b/admin.js
index c3ed6e98a8e4a82d541ffe266032c9dacc39ebaf..3ca5fb58133d25cde692f3500baa649689a0afbc 100644
--- a/admin.js
+++ b/admin.js
@@ -1,4 +1,80 @@
-document.getElementById('form').addEventListener('submit', function(e) {
+// Lógica de cadastro para a tela administrativa
+
+// ---- Cadastro de Times ----
+document.getElementById('formTime').addEventListener('submit', (e) => {
   e.preventDefault();
-  alert('Formulário salvo sem recarregar!');
-});
+  const nome = document.getElementById('nomeTime').value.trim();
+  if (!nome) return;
+  db.ref('times').push({ nome });
+  e.target.reset();
+});
+
+db.ref('times').on('value', (snapshot) => {
+  const ul = document.getElementById('listaTimes');
+  const select = document.getElementById('selectTime');
+  ul.innerHTML = '';
+  select.innerHTML = '<option value="" disabled selected>Selecione</option>';
+  snapshot.forEach((child) => {
+    const time = child.val();
+    const li = document.createElement('li');
+    li.textContent = time.nome;
+    ul.appendChild(li);
+
+    const option = document.createElement('option');
+    option.value = time.nome;
+    option.textContent = time.nome;
+    select.appendChild(option);
+  });
+});
+
+// ---- Cadastro de Jogadores ----
+document.getElementById('formJogador').addEventListener('submit', (e) => {
+  e.preventDefault();
+  const jogador = {
+    nome: document.getElementById('nomeJogador').value.trim(),
+    posicao: document.getElementById('posicaoJogador').value.trim(),
+    numero: document.getElementById('numeroJogador').value.trim(),
+    time: document.getElementById('selectTime').value,
+    gols: 0
+  };
+  db.ref('jogadores').push(jogador);
+  e.target.reset();
+});
+
+db.ref('jogadores').on('value', (snapshot) => {
+  const ul = document.getElementById('listaJogadores');
+  ul.innerHTML = '';
+  snapshot.forEach((child) => {
+    const j = child.val();
+    const li = document.createElement('li');
+    li.textContent = `${j.nome} - ${j.time}`;
+    ul.appendChild(li);
+  });
+});
+
+// ---- Cadastro de Jogos ----
+document.getElementById('formJogo').addEventListener('submit', (e) => {
+  e.preventDefault();
+  const jogo = {
+    timeA: document.getElementById('timeA').value.trim(),
+    timeB: document.getElementById('timeB').value.trim(),
+    data: document.getElementById('dataJogo').value,
+    hora: document.getElementById('horaJogo').value,
+    aoVivo: document.getElementById('aoVivo').checked,
+    golsA: 0,
+    golsB: 0
+  };
+  db.ref('jogos').push(jogo);
+  e.target.reset();
+});
+
+db.ref('jogos').on('value', (snapshot) => {
+  const ul = document.getElementById('listaJogos');
+  ul.innerHTML = '';
+  snapshot.forEach((child) => {
+    const j = child.val();
+    const li = document.createElement('li');
+    li.textContent = `${j.timeA} x ${j.timeB} - ${j.data} ${j.hora}`;
+    ul.appendChild(li);
+  });
+});
 
EOF
)
