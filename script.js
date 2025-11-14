// ---------------------------
// TALENT CATEGORIES
// ---------------------------
const categories = [
    { id: "all", title: "All Talents" },
    { id: "music", title: "Music" },
    { id: "dance", title: "Dance" },
    { id: "art", title: "Art" },
    { id: "photography", title: "Photography" },
    { id: "coding", title: "Coding" }
];

// ---------------------------
// TALENT LISTINGS
// ---------------------------
const talents = [
    {
        name: "Aarav Kumar",
        category: "photography",
        image: "https://source.unsplash.com/600x400/?photographer",
        description: "Nature and wildlife photographer with creative framing."
    },
    {
        name: "Sana Sharma",
        category: "art",
        image: "https://source.unsplash.com/600x400/?painting",
        description: "Sketching & watercolor artist with exhibition experience."
    },
    {
        name: "Rohan Verma",
        category: "music",
        image: "https://source.unsplash.com/600x400/?singer",
        description: "Singer & guitarist specializing in Bollywood covers."
    },
    {
        name: "Neha Patel",
        category: "dance",
        image: "https://source.unsplash.com/600x400/?dance",
        description: "Professional classical & western fusion dancer."
    },
    {
        name: "Kiran Yadav",
        category: "coding",
        image: "https://source.unsplash.com/600x400/?programmer",
        description: "Full-stack developer building creative web apps."
    }
];

// DOM references
const categoryRow = document.getElementById("categoryRow");
const cardsRow = document.getElementById("cardsRow");
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const sortSelect = document.getElementById("sortSelect");

let activeCategory = "all";
let query = "";

// ---------------------------
// RENDER CATEGORIES
// ---------------------------
function renderCategories() {
    categoryRow.innerHTML = categories
        .map(cat => `
            <div class="col-md-2">
                <div class="category-box ${cat.id === activeCategory ? 'active-category' : ''}" data-id="${cat.id}">
                    ${cat.title}
                </div>
            </div>
        `)
        .join("");

    document.querySelectorAll(".category-box").forEach(box => {
        box.addEventListener("click", () => {
            activeCategory = box.dataset.id;
            renderCategories();
            renderCards();
        });
    });
}

// ---------------------------
// FILTER FUNCTION
// ---------------------------
function matchFilters(talent) {
    const inCategory = activeCategory === "all" || talent.category === activeCategory;
    const matchesQuery =
        !query ||
        talent.name.toLowerCase().includes(query) ||
        talent.description.toLowerCase().includes(query);

    return inCategory && matchesQuery;
}

// ---------------------------
// RENDER TALENT CARDS
// ---------------------------
function renderCards() {
    let filtered = talents.filter(matchFilters);

    // Sorting
    if (sortSelect.value === "name_asc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortSelect.value === "name_desc") {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (filtered.length === 0) {
        cardsRow.innerHTML = `<p class="text-muted">No talents found.</p>`;
        return;
    }

    cardsRow.innerHTML = filtered
        .map(
            t => `
        <div class="col-md-4">
            <div class="card shadow-sm">
                <img src="${t.image}" class="card-img-top" alt="${t.name}">
                <div class="card-body">
                    <h5 class="card-title">${t.name}</h5>
                    <p class="text-muted">${t.category.toUpperCase()}</p>
                    <p class="card-text">${t.description}</p>
                </div>
            </div>
        </div>
    `
        )
        .join("");
}

// ---------------------------
// EVENT LISTENERS
// ---------------------------
searchBtn.addEventListener("click", () => {
    query = searchBox.value.toLowerCase().trim();
    renderCards();
});

searchBox.addEventListener("keyup", () => {
    query = searchBox.value.toLowerCase().trim();
    renderCards();
});

sortSelect.addEventListener("change", renderCards);

// ---------------------------
// INITIAL LOAD
// ---------------------------
renderCategories();
renderCards();
