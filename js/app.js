const campoMain = document.getElementById("app");
const botoes = document.querySelectorAll(".nav-btn");

const telas = {
  Dashboard: `
  <header>
    <h1 class="text-center">Informações de Eventos</h1>
  </header>
  <section>
    <div class="row mt-4 bg-white rounded-3 p-3 mx-auto shadow" style="max-width: 500px;">
      <div class="col-md-7"><h3>Total de eventos:<div id="totalRes"></div></h3></div>
      <div class="col-md-8"><h3>Eventos agendados:<div id="totalRes"></h3></div>
      <div class="col-md-8"><h3>Eventos realizados:<div id="totalRes"></h3></div>
    </div>
  </section>
  <footer class="bg-white text-black rounded-3 p-3 mx-auto shadow text-center fst-italic" style="max-width: 500px;">
    <p>&copy;Bootstrap</p>
  </footer>
  `,
  NovoEvento: `
    <h1 class="text-center">Cadastrar Eventos</h1>
  `,
  Eventos: `
    <h1 class="text-center">Eventos</h1>
  `,
};

botoes.forEach((botao) => {
  botao.addEventListener("click", (event) => {
    event.preventDefault();

    const telaAlvo = botao.dataset.view;

    if (telas[telaAlvo]) {
      campoMain.innerHTML = telas[telaAlvo];
    }
  });
});
