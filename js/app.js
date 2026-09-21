const telas = {
  Dashboard: `
  <section class="card shadow mx-auto" style="max-width: 500px; border-radius: 10px;">
    <div>
    <h3 class="card-title text-center mb-4">Sobre Eventos</h3>
      <div class="col-md-12 m-3"><h4>Total de eventos: <span id="tEventos">0</span></h4></div>
      <div class="col-md-10 m-3"><h4>Eventos agendados: <span id="tAgendamentos">0</span></h4></div>
      <div class="col-md-10 m-3"><h4>Eventos realizados: <span id="tRealizados">0</span></h4></div>
    </div>
  </section>
  <footer class="bg-white text-black rounded-3 p-3 mx-auto text-center fst-italic" style="max-width: 500px;">
    <p>&copy;Bootstrap & Js</p>
  </footer>
  `,
  NovoEvento: `
      <div class="container">
    <div class="card shadow mx-auto" style="max-width: 500px; border-radius: 10px;">
      <div class="card-body p-4">
        <h3 class="card-title text-center mb-4">Cadastro de Evento</h3>

        <form id="formEvento">
          
          <div class="mb-3">
            <label for="titulo" class="form-label">Título</label>
            <input type="text" class="form-control" id="titulo" placeholder="Ex: Palestra de Tecnologia" required>
          </div>

          <div class="mb-3">
            <label for="tipo" class="form-label">Tipo</label>
            <select class="form-select" id="tipo" required>
              <option value="" selected disabled>Selecione um tipo...</option>
              <option value="Palestra">Palestra</option>
              <option value="Workshop">Workshop</option>
              <option value="Minicurso">Minicurso</option>
              <option value="Visita Técnica">Visita Técnica</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="data" class="form-label">Data</label>
            <input type="date" class="form-control" id="data" required>
          </div>

          <div class="mb-3">
            <label for="local" class="form-label">Local</label>
            <input type="text" class="form-control" id="local" placeholder="Ex: Avenida Tabelião, N°18" required>
          </div>

          <div class="mb-3">
            <label for="descricao" class="form-label">Descrição</label>
            <textarea class="form-control" id="descricao" rows="3" required></textarea>
          </div>

          <button type="submit" class="btn btn-primary w-100 mt-2">Cadastrar</button>
        </form>
      </div>
    </div>
  </div>
  <footer class="bg-white text-black rounded-3 p-3 mx-auto text-center fst-italic" style="max-width: 500px;">
    <p>&copy;Bootstrap & Js</p>
  </footer>
  `,
  Eventos: `
  <div class="container">
    <h1 class="text-center mt-2">Eventos</h1>
    <div class="row" id="cardEventos"></div>
  </div>
    <footer class="bg-white text-black rounded-3 p-3 mx-auto text-center fst-italic" style="max-width: 500px;">
    <p>&copy;Bootstrap & Js</p>
  </footer>

  `,
};

const eventos = [];

const exibeMain = document.getElementById("app"); //Selecionando Main para exibir informações.
exibeMain.innerHTML = telas.Dashboard;
const botoes = document.querySelectorAll(".nav-btn"); //Cria uma NodeList que armazena todos elementos onde temos a class nav-btn.
const pesquisar = document.getElementById("pesquisaEvento");
const filtroStatus = document.getElementById("filtroStatus");

pesquisar.addEventListener("input", () => {
  const txtPesquisa = pesquisar.value.toLowerCase(); //Converte para minúsculo
  const cardEventos = document.getElementById("cardEventos");
  if (!cardEventos) return;

  cardEventos.innerHTML = "";
  const eventosFiltrados = eventos.filter((procurando) => {
    return procurando.titulo.toLowerCase().includes(txtPesquisa);
  });
  eventosFiltrados.forEach((evento) => {
    criarCard(evento);
  });
});

botoes.forEach((elementos) => {
  //Percorro todos elementos de botoes, utilizando o forEach. O nome escolhido para percorrer foi "elementos".
  elementos.addEventListener("click", (clicou) => {
    //addEventListener vai escutar um evento, neste caso o "click". E criei a função "clicou" utilizando função callback (nome_funcao) => {}.
    clicou.preventDefault(); //preventDefault() impede o comportamento padrão do navegador. Assim, o JavaScript pode controlar o que acontece com o formulário.

    const telaSelec = elementos.dataset.view; //.dataset.view permite acessar o conteudo de Data-view do html, que está armazenando o nome do botão que foi clicado.

    if (telas[telaSelec]) {
      //Se existir uma tela dentro dos objetos "telas" com o mesmo nome do elemento selecionado pelo data-view.
      exibeMain.innerHTML = telas[telaSelec]; //Exiba na main (html) o conteudo do objeto selecionado.
      if (telaSelec === "Dashboard") {
        pesquisar.classList.add("d-none");
        filtroStatus.classList.add("d-none");
        const tEventos = document.getElementById("tEventos");
        const tAgendamentos = document.getElementById("tAgendamentos");
        const tRealizados = document.getElementById("tRealizados");

        tEventos.textContent = eventos.length;
        tAgendamentos.textContent = eventos.filter(
          (busca) => busca.realizado === false,
        ).length;
        tRealizados.textContent = eventos.filter(
          (procura) => procura.realizado === true,
        ).length;
      } else if (telaSelec === "NovoEvento") {
        pesquisar.classList.add("d-none");
        filtroStatus.classList.add("d-none");
        const formEvento = document.getElementById("formEvento");
        //Submit detecta o envio do formulario idependente de como ele foi enviado.
        formEvento.addEventListener("submit", (submtEvento) => {
          submtEvento.preventDefault(); //preventDefault() impede o comportamento padrão do navegador. Assim, o JavaScript pode controlar o que acontece com o formulário.
          const titulo = document.getElementById("titulo").value;
          const tipo = document.getElementById("tipo").value;
          const data = document.getElementById("data").value;
          const local = document.getElementById("local").value;
          const descricao = document.getElementById("descricao").value;
          const realizado = false;
          const novoEvento = {
            id: Date.now(),
            titulo: titulo,
            tipo: tipo,
            data: data,
            local: local,
            descricao: descricao,
            realizado: realizado,
          };
          eventos.push(novoEvento);
          alert("Evento Agendado com sucesso!");
          exibeMain.innerHTML = telas.NovoEvento;
        });
      } else if (telaSelec === "Eventos") {
        pesquisar.classList.remove("d-none");
        filtroStatus.classList.remove("d-none");

        eventos.forEach((evento) => {
          criarCard(evento);
        });

        filtroStatus.addEventListener("change", () => {
          const statusSelecionado = filtroStatus.value;
          const cardEventos = document.getElementById("cardEventos");

          cardEventos.innerHTML = "";

          const eventosFiltrados = eventos.filter((evento) => {
            if (statusSelecionado === "todos") {
              return true;
            }

            if (statusSelecionado === "agendados") {
              return evento.realizado === false;
            }

            if (statusSelecionado === "realizados") {
              return evento.realizado === true;
            }
          });

          eventosFiltrados.forEach((evento) => {
            criarCard(evento);
          });
        });
      }
    }
  });
});

const criarCard = (evento) => {
  const card = document.createElement("div"); //Criei uma onde ficará o Card<div>.
  const corpoCard = document.createElement("div"); //Criei outra o corpo do Card<div>
  const cardEventos = document.getElementById("cardEventos");
  const h3 = document.createElement("h3"); //Criei um Para o titulo<h3>.
  const ptipo = document.createElement("p"); //Criei um <p> para o Tipo.
  const pdata = document.createElement("p"); //Criei um <p> para o data.
  const plocal = document.createElement("p"); //Criei um <p> para o local.
  const pdescricao = document.createElement("p"); //Criei um <p> para o descrição.
  const pstatus = document.createElement("p"); //Criei um <p> para o Status
  const btnStatus = document.createElement("button"); //Criei um <button> para editar Status
  const btnExcluir = document.createElement("button"); //Criei um <button> para Excluir Card

  btnStatus.addEventListener("click", () => {
    evento.realizado = !evento.realizado;
    if (evento.realizado) {
      pstatus.textContent = "Status: Realizado";
    } else {
      pstatus.textContent = "Status: Agendado";
    }
  });

  if (evento.realizado) {
    pstatus.textContent = "Status: Realizado";
  } else {
    pstatus.textContent = "Status: Agendado";
  }

  btnExcluir.addEventListener("click", () => {
    const findId = eventos.findIndex((item) => item.id === evento.id); //.findIndex percorre os objetos para encontrar o id do evento.
    const conf = confirm("Deseja realmente excluir esse evento?");
    if (conf == true) {
      eventos.splice(findId, 1); //.splice(findId, 1) Remove da Array o Objeto card
      card.remove(); //.remove() Remove o Card visualmente
    }
  });

  h3.textContent = evento.titulo;
  ptipo.textContent = `Tipo: ${evento.tipo}`;
  pdata.textContent = `Data: ${evento.data}`;
  plocal.textContent = `Local: ${evento.local}`;
  pdescricao.textContent = `Descrição: ${evento.descricao}`;
  btnStatus.textContent = "Alterar Status";
  btnExcluir.textContent = "Excluir";

  btnExcluir.classList.add("d-flex", "ms-auto");
  card.classList.add("card", "mb-3"); //Adiciono class na minha tag criada
  corpoCard.classList.add("card-body"); //Adiciono class na minha tag criada
  //corpoCard recebe h3 e p -> <div> <h3><p></p></h3> </div>.
  corpoCard.append(
    h3,
    ptipo,
    pdata,
    plocal,
    pstatus,
    pdescricao,
    btnStatus,
    btnExcluir,
  );
  card.append(corpoCard); //card recebe corpoCard.
  cardEventos.append(card);
};
