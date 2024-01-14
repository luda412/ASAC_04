// 저장된 데이터를 가져와 화면에 표시하는 함수
function displaySavedData() {
    var storedData = localStorage.getItem('userInput');
    var displayDiv = document.getElementById('displayData');
    if (storedData) {
        displayDiv.textContent = storedData;
    } else {
        displayDiv.textContent = '저장된 데이터가 없습니다.';
    }
}

// 입력된 데이터를 Local Storage에 저장하는 함수
function saveData() {
    var userInput = document.getElementById('dataInput').value;
    localStorage.setItem('userInput', userInput);
    displaySavedData(); // 저장 후에 바로 표시
}

// 삭제 기능을 구현하는 함수
function deleteData() {
    localStorage.removeItem('userInput');
    displaySavedData(); // 삭제 후에 바로 표시
}

// 페이지가 로드될 때 저장된 데이터를 표시
displaySavedData();

// "저장" 버튼에 클릭 이벤트를 추가
var saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', saveData);

// "삭제" 버튼에 클릭 이벤트를 추가
var deleteButton = document.getElementById('deleteButton');
deleteButton.addEventListener('click', deleteData);
