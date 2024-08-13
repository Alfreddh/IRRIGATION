
$(function () {
  // Fonction de suppression
  $('.delete-btn').on('click', function() {
          // Suppression de la ligne parente (tr)
          $(this).closest('tr').remove();

          // Retirer l'overlay
          $('.modal-backdrop').remove();
          $('body').removeClass('modal-open');
          $('body').css('padding-right', '');
      });
});

function updateClock() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    var timeString = hours + ':' + minutes + ':' + seconds;

    document.getElementById('real-time-clock').textContent = timeString;
}

// Mettre à jour l'heure immédiatement et ensuite chaque seconde
updateClock();
setInterval(updateClock, 1000);

function updateBatteryStatus(battery) {
    var level = Math.round(battery.level * 100);
    var batteryIcon = document.getElementById('battery-icon');
    var batteryPercentage = document.getElementById('battery-percentage');

    // Mettre à jour l'icône de batterie en fonction du niveau
    if (level > 75) {
        batteryIcon.className = 'fas fa-battery-full';
    } else if (level > 50) {
        batteryIcon.className = 'fas fa-battery-three-quarters';
    } else if (level > 25) {
        batteryIcon.className = 'fas fa-battery-half';
    } else if (level > 10) {
        batteryIcon.className = 'fas fa-battery-quarter';
    } else {
        batteryIcon.className = 'fas fa-battery-empty';
    }

    // Mettre à jour le texte avec le pourcentage de la batterie
    batteryPercentage.textContent = level + '%';
}

navigator.getBattery().then(function(battery) {
    // Initialisation de l'état de la batterie
    updateBatteryStatus(battery);

    // Écoute des événements de changement de niveau de batterie
    battery.addEventListener('levelchange', function() {
        updateBatteryStatus(battery);
    });
});
