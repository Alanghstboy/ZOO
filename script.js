const animals = [
  {
    id: 1,
    name: "León Africano",
    category: "mamifero",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&auto=format&fit=crop",
    description: "Rey de la sabana, vive en manadas y es uno de los grandes felinos del continente africano."
  },
  {
    id: 2,
    name: "Elefante Asiático",
    category: "mamifero",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&auto=format&fit=crop",
    description: "El mamífero terrestre más grande de Asia, conocido por su memoria y su inteligencia."
  },
  {
    id: 3,
    name: "Jirafa",
    category: "mamifero",
    image: "https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=800&auto=format&fit=crop",
    description: "El animal más alto del mundo, con su largo cuello alcanza las copas de los árboles."
  },
  {
    id: 4,
    name: "Águila Real",
    category: "ave",
    image: "https://images.unsplash.com/photo-1549608276-5786777e6587?w=800&auto=format&fit=crop",
    description: "Majestuosa rapaz con una vista imparable, capaz de detectar presas a gran distancia."
  },
  {
    id: 5,
    name: "Guacamayo Azul",
    category: "ave",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&auto=format&fit=crop",
    description: "Ave colorida originaria de la selva amazónica, famosa por sus vistosos colores."
  },
  {
    id: 6,
    name: "Cocodrilo del Nilo",
    category: "reptil",
    image: "https://images.unsplash.com/photo-1590421310337-add9384a1865?w=800&auto=format&fit=crop",
    description: "Uno de los reptiles más grandes del planeta, un superviviente desde la era de los dinosaurios."
  },
  {
    id: 7,
    name: "Panda Gigante",
    category: "mamifero",
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&auto=format&fit=crop",
    description: "Símbolo de la conservación mundial, se alimenta principalmente de bambú."
  },
  {
    id: 8,
    name: "Iguana Verde",
    category: "reptil",
    image: "https://images.unsplash.com/photo-1548658146-f142deadf8e3?w=800&auto=format&fit=crop",
    description: "Reptil herbívoro tropical que pasa gran parte del tiempo tomando el sol."
  },
  {
    id: 9,
    name: "Flamenco",
    category: "ave",
    image: "https://images.unsplash.com/photo-1553113938-5407ca320e30?w=800&auto=format&fit=crop",
    description: "Ave elegante de color rosado que vive en lagunas y mantiene el equilibrio sobre una pata."
  }
];

const categories = {
  mamifero: "Mamífero",
  ave: "Ave",
  reptil: "Reptil"
};

const grid = document.getElementById("animalGrid");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

function renderAnimals(filter = "todos") {
  grid.innerHTML = "";
  const filtered = filter === "todos"
    ? animals
    : animals.filter(a => a.category === filter);

  filtered.forEach(animal => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${animal.image}" alt="${animal.name}">
      <div class="card-body">
        <h3>${animal.name}</h3>
        <span class="category">${categories[animal.category]}</span>
      </div>
    `;
    card.addEventListener("click", () => openModal(animal));
    grid.appendChild(card);
  });
}

function openModal(animal) {
  modalBody.innerHTML = `
    <img src="${animal.image}" alt="${animal.name}">
    <div class="modal-body">
      <h2>${animal.name}</h2>
      <span class="category">${categories[animal.category]}</span>
      <p style="margin-top:12px; line-height:1.6;">${animal.description}</p>
    </div>
  `;
  modal.classList.add("show");
}

function closeModalHandler() {
  modal.classList.remove("show");
}

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderAnimals(btn.dataset.filter);
  });
});

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const message = document.getElementById("formMessage");
  message.textContent = `¡Gracias, ${nombre}! Tu mensaje ha sido enviado. Te responderemos pronto.`;
  e.target.reset();
  setTimeout(() => (message.textContent = ""), 5000);
});

closeModal.addEventListener("click", closeModalHandler);
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModalHandler();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModalHandler();
});

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

renderAnimals();