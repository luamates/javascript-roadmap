// Classe para representar um item do menu
class Item {
  constructor(nome, preco, descricao) {
    this.nome = nome;
    this.preco = preco;
  }
}

// Array para armazenar os itens do menu (cardápio padrão)
let menuItems = [
  new Item("Couvert", 45.0),

  new Item("Salada Niçoise", 99.0),
  new Item("Salada Caprese", 99.0),
  new Item("Salada de grãos", 96.0),

  new Item("Misto de mar", 122.0),
  new Item("Carpaccio de polvo", 114.0),
  new Item("Tartar de atum", 120.0),
  new Item("Carpaccio de carne", 116.0),

  new Item("Arroz de bacalhau", 174.0),
  new Item("Arroz de pato", 212.0),

  new Item("Spaghetti Pomodoro", 99.0),
  new Item("Trenette al pesto", 115.0),
  new Item("Gnochi al gorgonzola", 99.0),
  new Item("Penne all'arrabiata", 112.0),
  new Item("Ravioli di ricota", 125.0),
  new Item("Spaghetti al mare", 229.0),
  new Item("Ravioli di pesce", 152.0),
  new Item("Lasagna verde", 139.0),
  new Item("Ravioli d'anatra", 167.0),

  new Item("Salmão", 176.0),
  new Item("Camarão ao champagne", 215.0),
  new Item("Bacalhoada", 214.0),
  new Item("Medalhao de mignon", 210.0),
  new Item("Saltimbocca alla romana", 170.0),
  new Item("Black cod", 199.0),
  new Item("Posta de robalo", 185.0),

  new Item("Panqueca de doce de leite", 50.0),
  new Item("Morango e merengue", 50.0),
  new Item("Bolo fudge", 55.0),
  new Item("Mil folhas com creme", 55.0),
  new Item("Cheesecake com calda", 55.0),
  new Item("Sorvete do dia", 36.0),
  new Item("Fruta da estação", 35.0),
];

// Objeto Pedido
class Pedido {
  constructor() {
    this.itens = [];
    this.desconto = 0;
    this.gorjeta = 0;
  }
  adicionarItem(item, quantidade) {
    this.itens.push({ item, quantidade });
  }
}

// Array para armazenar os pedidos
let pedidos = [];
