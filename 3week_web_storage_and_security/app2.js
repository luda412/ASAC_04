// 저장된 데이터를 가져와 화면에 표시하는 함수
function displaySavedData() {
    var displayDiv = document.getElementById('displayData');
    displayDiv.innerHTML = ''; // 이전에 생성된 버튼을 모두 지웁니다.

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.startsWith('userInput')) {
            var storedData = localStorage.getItem(key);
            var dataDisplay = document.createElement('div');
            dataDisplay.textContent = storedData;

            var deleteButton = document.createElement('button'); // 삭제 버튼을 생성합니다.
            deleteButton.textContent = '삭제';
            deleteButton.addEventListener('click', function (k) {
                return function () {
                    localStorage.removeItem(k); // 해당 데이터를 Local Storage에서 삭제합니다.
                    displaySavedData(); // 삭제 후에 다시 표시
                };
            }(key));

            displayDiv.appendChild(dataDisplay); // 데이터 표시용 div를 HTML에 추가합니다.
            displayDiv.appendChild(deleteButton); // 삭제 버튼을 HTML에 추가합니다.
        }
    }
}

// 입력된 데이터를 Local Storage에 저장하는 함수
function saveData() {
    var userInput = document.getElementById('dataInput').value;
    var key = 'userInput_' + new Date().getTime(); // 현재 시간을 이용하여 고유한 키를 생성합니다.
    localStorage.setItem(key, userInput); // 고유한 키에 해당하는 데이터를 Local Storage에 저장합니다.
    displaySavedData(); // 저장 후에 바로 표시
}

// 페이지가 로드될 때 저장된 데이터를 표시
displaySavedData();

// "저장" 버튼에 클릭 이벤트를 추가
var saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', saveData);
