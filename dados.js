/* ==========================================================
   DADOS DO GORDINO'S — edite só esta parte.
   whatsapp e instagram ainda são EXEMPLOS.
   ========================================================== */
var SITE = {
  tagline: "Restaurante e marmitaria · Americana/SP",
  whatsapp: "5511999999999",           // só números, com 55 + DDD
  instagram: "gordinos",               // sem @
  pedido: "pedido.html",               // página "Fazer pedido" (escolha da unidade)
  site: "https://loja.neemo.com.br/grupogordinos",    // site do Gordino's (trocar se for outro endereço)

  // Unidades (aparecem ao tocar em "Como chegar"). Horários: [abre, fecha] em horas; null = fechado.
  // Dias: 0 = Domingo, 1 = Segunda ... 6 = Sábado.
  unidades: [
    {
      id: "santa-cruz",
      aba: "Unidade 1",
      titulo: "Santa Cruz",
      pedido: "https://loja.neemo.com.br/gordinos-restaurante",
      whatsapp: "",                    // WhatsApp desta unidade ("" = usa o número geral)
      endereco: "Rua São Vito, 1812",
      bairro: "Santa Cruz · Americana/SP",
      resumo: "Todos os dias, das 8h às 14h.",
      horarios: { 0:[8,14], 1:[8,14], 2:[8,14], 3:[8,14], 4:[8,14], 5:[8,14], 6:[8,14] }
    },
    {
      id: "zanaga",
      aba: "Unidade 2",
      titulo: "Zanaga",
      pedido: "https://loja.neemo.com.br/gordinos-marmitaria",
      whatsapp: "",                    // WhatsApp desta unidade ("" = usa o número geral)
      endereco: "Av. Antônio Conselheiro, 332",
      bairro: "Antônio Zanaga II · Americana/SP",
      resumo: "De segunda a sábado, das 8h às 14h.",
      horarios: { 0:null, 1:[8,14], 2:[8,14], 3:[8,14], 4:[8,14], 5:[8,14], 6:[8,14] }
    }
  ]
};

/* ============ não precisa mexer daqui pra baixo ============ */
var DIAS = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
function $(id){ return document.getElementById(id); }
function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); }
function hh(n){ return (n % 24) + "h"; }

var now = new Date(), today = now.getDay();

// Link do WhatsApp de uma unidade, já com a mensagem dizendo qual é a loja
function waUrl(u){
  return "https://wa.me/" + (u.whatsapp || SITE.whatsapp) + "?text=" + encodeURIComponent("Olá! Vim pelo site e quero falar com a " + u.aba + " (" + u.titulo + ").");
}

// Status aberto/fechado de uma unidade (considera horário que passa da meia-noite)
function status(hor){
  var t = now.getHours() + now.getMinutes() / 60;
  var h = hor[today], y = hor[(today + 6) % 7];
  if ((h && t >= h[0] && t < h[1]) || (y && y[1] > 24 && t < y[1] - 24))
    return { open: true, text: "Aberta agora · até " + hh(h && t >= h[0] ? h[1] : y[1]) };
  for (var i = 0; i < 7; i++){
    var d = (today + i) % 7, x = hor[d];
    if (x && (i > 0 || t < x[0]))
      return { open: false, text: "Fechada · abre " + (i === 0 ? "hoje" : i === 1 ? "amanhã" : DIAS[d].toLowerCase()) + " às " + hh(x[0]) };
  }
  return { open: false, text: "Fechada" };
}
