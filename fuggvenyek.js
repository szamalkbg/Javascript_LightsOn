export function lista() {
  const lista = [];
  for (let index = 0; index < 9; index++) {
    let szamok = Math.floor(Math.random() * 2);
    lista.push(szamok);
  }
  return lista;
}

export function osszeAllit(lista) {
  const ELEM = $("#palya");
  let txt = "";
  for (let i = 0; i < lista.length; i++) {
    let kep;
    if (lista[i] === 0) {
      kep = 'le.png';
    } else {
      kep = 'fel.png';
    }
    txt += `<div class="lampa" id="lampa-${i}" style="background-image: url(${kep});"></div>`;
  }
  ELEM.html(txt);
  lekapcsolt(lista);
  valto(lista);
}

export function valto(lista) {
  function kattintas() {
    let i = parseInt(this.id.replace('lampa-', ''));
    valtozas(i, lista);
    const szomszedok = [
      [1, 3], [0, 2, 4], [1, 5],
      [0, 4, 6], [1, 3, 5, 7], [2, 4, 8],
      [3, 7], [4, 6, 8], [5, 7]
    ];
    szomszedok[i].forEach(szomszed => valtozas(szomszed, lista));
    osszeAllit(lista);
    if (jatekVege(lista)) {
      alert("Hurrá, meghosszabítottad a Föld életét!");
    }
  }

  function kattintasokHozzaadasa() {
    $(".lampa").click(kattintas);
  }

  kattintasokHozzaadasa();
}

function valtozas(index, lista) {
  lista[index] = 1 - lista[index];
}

function jatekVege(lista) {
  return lista.every(lampa => lampa === 0);
}

function lekapcsolt(lista) {
  const lekapcsoltSzam = lista.filter(lampa => lampa === 0).length;
  $("#lekapcsolt").text(`Jelenleg ${lekapcsoltSzam} lámpa van lekapcsolva.`);
}


export function ujJatek() {
  $("button").click(function () {
    const frissLista = lista();
    osszeAllit(frissLista);
    valto(frissLista);
  });
}
