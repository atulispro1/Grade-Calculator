const subjects = ['Maths', 'Science', 'English', 'Sst', 'Computer/IT'];

const marksForm = document.getElementById('marksForm');
const resultsDiv = document.getElementById('results');
const marksList = document.getElementById('marksList');
const totalP = document.getElementById('total');
const averageP = document.getElementById('average');
const gradeP = document.getElementById('grade');
const resetBtn = document.getElementById('resetBtn');

marksForm.addEventListener('submit', function(e) {
  e.preventDefault();

  let marks = [];
  let valid = true;

  subjects.forEach(sub => {
    const input = marksForm.elements[sub];
    const mark = Number(input.value);
    if (
      isNaN(mark) ||
      input.value.trim() === "" ||
      mark < 0 ||
      mark > 100
    ) {
      input.style.border = '2px solid #e84141';
      input.focus();
      valid = false;
    } else {
      input.style.border = '1.5px solid #34e89e';
    }
    marks.push(mark);
  });

  if (!valid) {
    alert("Please enter valid marks (0 to 100) for all subjects.");
    return;
  }

  // Show results
  resultsDiv.classList.remove('hidden');
  marksList.innerHTML = subjects.map((sub, i) =>
    `<li>${sub}: <strong>${marks[i]}</strong></li>`
  ).join("");

  const total = marks.reduce((sum, val) => sum + val, 0);
  const avg = total / marks.length;
  let grade = "";
  let gradeClass = "";

  if (avg >= 90)      { grade = "A+"; gradeClass = "grade-Aplus"; }
  else if (avg >=80)  { grade = "A";  gradeClass = "grade-A"; }
  else if (avg >=70)  { grade = "B";  gradeClass = "grade-B"; }
  else if (avg >=60)  { grade = "C";  gradeClass = "grade-C"; }
  else if (avg >=50)  { grade = "D";  gradeClass = "grade-D"; }
  else                { grade = "F";  gradeClass = "grade-F"; }

  totalP.textContent = `Total Marks: ${total}/500`;
  averageP.textContent = `Average: ${avg.toFixed(2)}%`;
  gradeP.textContent = `📈 Grade: ${grade}`;
  gradeP.className = gradeClass;

  // Animate results
  resultsDiv.style.animation = 'none';
  void resultsDiv.offsetWidth; // Trick for re-triggering animation
  resultsDiv.style.animation = null;
});

// Reset everything
resetBtn.addEventListener('click', function() {
  marksForm.reset();
  resultsDiv.classList.add('hidden');
  subjects.forEach(sub => {
    const input = marksForm.elements[sub];
    input.style.border = '1.5px solid #4a90e2bb';
  });
});
