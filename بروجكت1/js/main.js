const storiesContainer = document.getElementById("storiesContainer");

// زر الوضع الليلي
const toggleDark = document.createElement("button");
toggleDark.innerText = "الوضع الليلي";
toggleDark.onclick = () => document.body.classList.toggle("dark-mode");
document.body.prepend(toggleDark);

// عرض القصص
function displayStories(storiesArray) {
  storiesContainer.innerHTML = "";
  storiesArray.forEach((story, index) => {
    storiesContainer.innerHTML += `
      <div class="card">
        <h3>${story.title}</h3>
        <h4>✍ ${story.author} | 📅 ${story.date}</h4>
        <button onclick="readStory(${index})">اقرأ القصة</button>
        <button onclick="alert('أعجبني ✅')">🤍 أعجبني</button>
      </div>
    `;
  });
}

if (storiesContainer) {
  let stories = JSON.parse(localStorage.getItem("stories")) || [];
  displayStories(stories);

  // البحث
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function() {
    const filter = this.value.toLowerCase();
    const filtered = stories.filter(s => s.title.toLowerCase().includes(filter));
    displayStories(filtered);
  });
}

// الانتقال لصفحة القصة
function readStory(index) {
  const stories = JSON.parse(localStorage.getItem("stories"));
  localStorage.setItem("currentStory", JSON.stringify(stories[index]));
  window.location.href = "story.html";
}

// إضافة قصة جديدة
const form = document.getElementById("storyForm");

if(form){
  form.addEventListener("submit", function(e){
    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    let author = prompt("اكتب اسم المؤلف:");
    if (!author) author = "مجهول";

    const date = new Date().toLocaleDateString();

    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories.push({ title, content, author, date });

    localStorage.setItem("stories", JSON.stringify(stories));
    alert("تم نشر القصة ✅");
    window.location.href = "index.html";
  });
}
