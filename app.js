let mangaData = [];

async function loadManga() {
  try {
    const res = await fetch('manga.json');
    mangaData = await res.json();
    renderMangaList(mangaData);
  } catch (err) {
    console.error('خطأ في تحميل البيانات:', err);
  }
}

function renderMangaList(list) {
  const container = document.getElementById('mangaList');
  container.innerHTML = '';
  list.forEach(manga => {
    const card = document.createElement('div');
    card.className = 'manga-card';
    card.innerHTML = `
      <img src="${manga.cover}" alt="${manga.title}">
      <h3>${manga.title}</h3>
    `;
    card.onclick = () => openManga(manga);
    container.appendChild(card);
  });
}

function openManga(manga) {
  document.getElementById('mangaList').classList.add('hidden');
  document.getElementById('readerView').classList.remove('hidden');
  
  const chapter = manga.chapters[0];
  document.getElementById('chapterTitle').innerText = `${manga.title} - ${chapter.title}`;
  
  const pagesContainer = document.getElementById('pagesContainer');
  pagesContainer.innerHTML = '';
  chapter.pages.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.loading = 'lazy';
    pagesContainer.appendChild(img);
  });
}

document.getElementById('backBtn').onclick = () => {
  document.getElementById('readerView').classList.add('hidden');
  document.getElementById('mangaList').classList.remove('hidden');
};

document.getElementById('searchInput').oninput = (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = mangaData.filter(m => m.title.toLowerCase().includes(query));
  renderMangaList(filtered);
};

loadManga();
