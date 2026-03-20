// مصفوفة لتخزين المهام
let tasks = [];

// جلب المهام من LocalStorage عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
});

// وظيفة حفظ المهام في LocalStorage
function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// وظيفة عرض المهام على الشاشة
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // تفريغ القائمة قبل إعادة رسمها

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center bg-gray-50 p-3 rounded-md border border-gray-200";

        li.innerHTML = `
            <span class="text-gray-700 font-medium">${task}</span>
            <div class="flex gap-2">
                <button onclick="editTask(${index})" class="text-yellow-500 hover:text-yellow-600 text-sm">تعديل ✏️</button>
                <button onclick="deleteTask(${index})" class="text-red-500 hover:text-red-600 text-sm">حذف ❌</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// وظيفة إضافة مهمة جديدة
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        tasks.push(taskText);
        saveToLocalStorage();
        renderTasks();
        taskInput.value = ""; // تفريغ الحقل بعد الإضافة
    } else {
        alert("الرجاء كتابة مهمة قبل الإضافة!");
    }
}

// وظيفة حذف مهمة
function deleteTask(index) {
    // إزالة العنصر من المصفوفة بناءً على رقمه (Index)
    tasks.splice(index, 1);
    saveToLocalStorage();
    renderTasks();
}

// وظيفة تعديل مهمة
function editTask(index) {
    const newTaskText = prompt("قم بتعديل المهمة:", tasks[index]);
    
    // التأكد من أن المستخدم أدخل نصاً ولم يضغط على "إلغاء"
    if (newTaskText !== null && newTaskText.trim() !== "") {
        tasks[index] = newTaskText.trim();
        saveToLocalStorage();
        renderTasks();
    }
}