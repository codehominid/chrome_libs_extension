// Saves options to chrome.storage
function save_options() {
  var findTextFields = document.getElementsByName('find[]');
  var replaceTextFields = document.getElementsByName('replace[]');
  var findReplaceMap = {};
  var orderedFind = [];

  for (var i = 0; i < findTextFields.length; i++) {
    if (findTextFields[i].value != '') {
      orderedFind.push(findTextFields[i].value);
      findReplaceMap[findTextFields[i].value] = replaceTextFields[i].value;
    }
  }

  chrome.storage.sync.set({
    'orderedFind': orderedFind,
    'findReplaceText': findReplaceMap
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status')
    status.textContent = 'Options saved.'
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });

  Window.close();
}

// Restores state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get("findReplaceText", function(obj1) {
    chrome.storage.sync.get("orderedFind", function(obj2){
        var keys = Object.keys(obj1.findReplaceText);
        var orderedFind = obj2.orderedFind;

        var findTextFields = document.getElementsByName('find[]');
        var replaceTextFields = document.getElementsByName('replace[]');

        for (var i = 0; i < orderedFind.length; i++) {
            findTextFields[i].value = orderedFind[i];
            replaceTextFields[i].value = obj.findReplaceText[orderedFind[i]];
        }
    })
  })
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
