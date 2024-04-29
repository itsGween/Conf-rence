// Attacher un écouteur d'événements au formulaire pour gérer la soumission
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêcher l'envoi normal du formulaire
  
    // Booléen pour suivre l'état de validation du formulaire
    let isValid = true;
  
    // Récupérer les valeurs des champs du formulaire
    var nom = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    //cherche le bouton radio nommé "subscription" qui est actuellement coché
    var subscriptionType = document.querySelector('input[name="subscription"]:checked');
    //cherche la les cases à cocher nommées "service" qui sont actuellement coché
    var services = document.querySelectorAll('input[name="services"]:checked');
    var quantity = document.getElementById('quantity').value;
    var comments = document.getElementById('comments').value.trim();
  
    // Fonction pour afficher les messages d'erreur
    function AfficheErreur(messageId, message) {
      var messageElement = document.getElementById(messageId);
      messageElement.innerText = message;
      messageElement.style.color = 'red';
      isValid = false;
    }
  
    // Nettoyer les messages d'erreur précédents
    function NettoieErreurs() {
      var errorMessages = document.querySelectorAll('.erreur');
      errorMessages.forEach(function(message) {
        message.innerText = '';
      });
    }
  
    NettoieErreurs(); // Nettoyer les messages d'erreur à chaque soumission
  
    // Vérifier que tous les champs obligatoires sont remplis
    if (!nom) AfficheErreur('messageErreur1', 'Le champ nom est obligatoire.');
    if (!email) AfficheErreur('messageErreur2', 'Le champ email est obligatoire.');
    if (!phone) AfficheErreur('messageErreur3', 'Le champ téléphone est obligatoire.');
    if (!subscriptionType) AfficheErreur('messageErreur4', 'Veuillez choisir un type d\'abonnement.');
    if (services.length === 0) AfficheErreur('messageErreur5', 'Veuillez choisir au moins un service.');
  
    // Valider l'email

    var emailRegex = /^[A-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
    if (email && !emailRegex.test(email)) {
      AfficheErreur('messageErreur2', 'Format email invalide. Ex: Exemple@domaine.com');
    }
  
    // Valider le numéro de téléphone
    var phoneRegex = /^\+1\(\d{3}\) \d{3}-\d{4}$/;
    if (phone && !phoneRegex.test(phone)) {
      AfficheErreur('messageErreur3', 'Format téléphone invalide. Ex: +1(555) 123-4567');
    }
  
    // Si le formulaire n'est pas valide, arrêter l'exécution
    if (!isValid) return;
  
    // Préparer les données à afficher
    var formData = {
      Nom: nom,
      Email: email,
      Téléphone: phone,
      Abonnement: subscriptionType.value,
      Services: Array.from(services).map(function(checkbox) {
        return checkbox.value;
      }),
      Quantité: quantity,
      Commentaires: comments
    };
  
    // Afficher les données sur une nouvelle page
    AfficheLesDonnees(formData);
  });
  
  // Fonction pour afficher les données validées dans une nouvelle page Bootstrap
  function AfficheLesDonnees(data) {
    var htmlContent = `
      <div class="container mt-5">
        <h2>Confirmation de l'inscription</h2>
        <p>Nom: ${data.Nom}</p>
        <p>Email: ${data.Email}</p>
        <p>Téléphone: ${data.Téléphone}</p>
        <p>Type d'abonnement: ${data.Abonnement}</p>
        <p>Services supplémentaires: ${data.Services.join(', ')}</p>
        <p>Quantité: ${data.Quantité}</p>
        <p>Commentaires: ${data.Commentaires }</p>
      </div>
    `;
  
    // Créer une nouvelle page et y inclure le contenu HTML
    var newWindow = window.open();
    newWindow.document.write(htmlContent);
    newWindow.document.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">');
  }
  