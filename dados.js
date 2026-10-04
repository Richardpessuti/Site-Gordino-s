/* ==========================================================
   DADOS DO GORDINO'S — edite só esta parte.
   instagram ainda é EXEMPLO.
   ========================================================== */
var SITE = {
  tagline: "Restaurante e Marmitaria · Americana/SP",
  whatsapp: "5519981650101",           // número geral (só números, com 55 + DDD)
  instagram: "gordinos",               // sem @
  pedido: "pedido.html",               // página "Fazer pedido" (escolha da unidade)
  site: "https://www.gordinos.com.br/",              // site do Gordino's

  // Unidades (aparecem ao tocar em "Como chegar"). Horários: [abre, fecha] em horas; null = fechado.
  // Dias: 0 = Domingo, 1 = Segunda ... 6 = Sábado.
  unidades: [
    {
      id: "santa-cruz",
      aba: "Unidade 1",
      titulo: "Santa Cruz",
      pedido: "https://loja.neemo.com.br/gordinos-restaurante",
      whatsapp: "5519981650101",
      mensagem: "Olá gostaria de fazer um pedido!!!",
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
      whatsapp: "5519991953819",
      mensagem: "Olá gostaria de fazer um pedido!!!",
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

// Link do WhatsApp de uma unidade, com a mensagem pronta
function waUrl(u){
  return "https://wa.me/" + (u.whatsapp || SITE.whatsapp) + "?text=" + encodeURIComponent(u.mensagem || "Olá! Vim pelo site.");
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
      return { open: false, text: "Fechada · Abre " + (i === 0 ? "hoje" : i === 1 ? "amanhã" : DIAS[d].toLowerCase()) + " às " + hh(x[0]) };
  }
  return { open: false, text: "Fechada" };
}
