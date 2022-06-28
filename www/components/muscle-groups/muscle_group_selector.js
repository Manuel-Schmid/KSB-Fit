let selectedMuscles = [];

function updateMuscleInput(preselection) {
    selectedMuscles = preselection.split(',')
    let muscles = document.getElementsByClassName('muscles-helper');
    for (let el of muscles) {
        el.checked = selectedMuscles.includes(el.id);
    }
}

// document.querySelectorAll(".muscle-groups svg g g[id]").forEach(function(group) {
//     // For the hover
//     group.addEventListener('mouseover', function(el) {
//         let id = el.path[1].id.toLowerCase()
//         if(!id) id = el.path[2].id.toLowerCase()
//         let label = document.querySelectorAll("label[for=" + id + "]")[0]
//         if (label.classList)
//             label.classList.add("hover")
//         else
//             label.className += ' ' + "hover"
//     })
//     group.addEventListener('mouseout', function(el) {
//         let id = el.path[1].id.toLowerCase()
//         if(!id) id = el.path[2].id.toLowerCase()
//         let label = document.querySelectorAll("label[for=" + id + "]")[0]
//         let clss = "hover"
//         if (label.classList)
//             label.classList.remove(clss)
//         else
//             label.className = label.className.replace(new RegExp('(^|\\b)' + clss.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
//     })
//     // For the click
//     group.addEventListener('click', function(el) {
//         let id = el.path[1].id.toLowerCase()
//         if(!id) id = el.path[2].id.toLowerCase()
//         let input = document.getElementById(id)
//         input.checked = !input.checked;
//         if (input.checked) selectedMuscles.push(id)
//         else selectedMuscles.splice(selectedMuscles.indexOf(id), 1)
//         updateMuscleInput()
//     });
// })

// document.querySelectorAll('.muscle-groups label').forEach(function(group) {
//     group.addEventListener('click', function(el) {
//         let id = el.path[0].innerText.toLowerCase()
//         let input = document.getElementById(id)
//         if (!input.checked) selectedMuscles.push(id)
//         else selectedMuscles.splice(selectedMuscles.indexOf(id), 1)
//         updateMuscleInput()
//     });
// })




