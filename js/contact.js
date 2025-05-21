document.addEventListener('DOMContentLoaded', function() {
            // Boutons de connexion
            const loginButtons = document.querySelectorAll('.btn-login');
            
            loginButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    showLoginModal();
                });
            });
            
            // Gestion du formulaire de contact
            const contactForm = document.getElementById('contactForm');
            
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Simulation d'envoi de formulaire
                    const submitBtn = this.querySelector('button[type="submit"]');
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
                    
                    // Simulation de délai réseau
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'Envoyer le message';
                        
                        // Réinitialiser le formulaire
                        contactForm.reset();
                        
                        // Afficher notification de succès
                        showNotification('Votre message a bien été envoyé. Nous vous répondrons dans les meilleurs délais.', 'success');
                    }, 1500);
                });
            }
            
            // Fonction pour afficher la modale de connexion
            function showLoginModal() {
                const modal = document.createElement('div');
                modal.className = 'login-modal';
                
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close-btn">&times;</span>
                        <h3>Connexion à I-Prof</h3>
                        <div class="login-options">
                            <button class="franceconnect-btn" id="fc-btn">
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffranceconnect.gouv.fr%2Fimages%2FFranceConnect-Logo.png&f=1&nofb=1&ipt=47cd4c568b0535b998e8b36fa7bb046f25e81ad274cee2143519480795810e2b" alt="FranceConnect">
                                Se connecter avec FranceConnect
                            </button>
                            <div class="separator">ou</div>
                        </div>
                        <form class="login-form">
                            <div class="form-group">
                                <label for="email">Identifiant de connexion</label>
                                <input type="text" id="email" placeholder="Adresse email académique ou NUMEN" required>
                            </div>
                            <div class="form-group">
                                <label for="password">Mot de passe</label>
                                <input type="password" id="password" placeholder="Votre mot de passe" required>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary">Se connecter</button>
                            </div>
                            <div class="form-links">
                                <a href="./mdp.html">Mot de passe oublié ?</a>
                            </div>
                        </form>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                // Gestion de la fermeture
                const closeBtn = modal.querySelector('.close-btn');
                closeBtn.addEventListener('click', function() {
                    document.body.removeChild(modal);
                });
                
                // Fermeture en cliquant à l'extérieur
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        document.body.removeChild(modal);
                    }
                });
                
                // Gestion du formulaire de connexion
                const form = modal.querySelector('.login-form');
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    document.body.removeChild(modal);
                    showLoading();
                    
                    // Simuler un délai de connexion et rediriger vers le dashboard
                    setTimeout(() => {
                        hideLoading();
                        window.location.href = 'dashboard.html';
                    }, 1500);
                });
                
                // Connexion avec FranceConnect
                const fcBtn = modal.querySelector('#fc-btn');
                fcBtn.addEventListener('click', function() {
                    document.body.removeChild(modal);
                    showLoading();
                    
                    // Simuler un délai de connexion et rediriger vers le dashboard
                    setTimeout(() => {
                        hideLoading();
                        window.location.href = 'dashboard.html';
                    }, 1500);
                });
            }
            
            // Afficher un indicateur de chargement
            function showLoading() {
                const loader = document.createElement('div');
                loader.className = 'loading-overlay';
                loader.innerHTML = `
                    <div class="spinner">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
                `;
                document.body.appendChild(loader);
            }
            
            // Masquer l'indicateur de chargement
            function hideLoading() {
                const loader = document.querySelector('.loading-overlay');
                if (loader) {
                    document.body.removeChild(loader);
                }
            }
        });