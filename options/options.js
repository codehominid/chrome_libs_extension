// // Saves options to chrome.storage
function save_options() {
  var findTextFields = document.getElementsByName('find[]')
  var replaceTextFields = document.getElementsByName('replace[]')
  var findReplaceMap = {}

  for(var i = 0; i < findTextFields.length; i++){
    if(findTextFields[i].value != ''){
      findReplaceMap[findTextFields[i].value] = replaceTextFields[i].value;
    }
  }

  chrome.storage.sync.set({
    'findReplaceText': findReplaceMap
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status')
    status.textContent = 'Options saved.'
    setTimeout(function() {
      status.textContent = ''
    }, 750);
  });
}

// // Restores select box and checkbox state using the preferences
// // stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get("findReplaceText", function(obj){
    var keys = Object.keys(obj.findReplaceText)

    var findTextFields = document.getElementsByName('find[]')
    var replaceTextFields = document.getElementsByName('replace[]')

    for(var i = 0; i < keys.length; i++){
      findTextFields[i].value = keys[i];
      replaceTextFields[i].value = obj.findReplaceText[keys[i]];
    }
  })
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
