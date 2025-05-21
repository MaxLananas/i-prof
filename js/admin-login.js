document.addEventListener('DOMContentLoaded', function() {
            // Variables pour les identifiants d'administrateurs (en pratique, ces identifiants seraient vérifiés côté serveur)
            const adminCredentials = [
                { username: 'admin', password: 'Iprof2025!' },
                { username: 'directeur', password: 'Direction2025!' },
                { username: 'recteur', password: 'Academie2025!' },
                { username: 'support', password: 'Support2025!' }
            ];
            
            // Gestion du formulaire de connexion
            const loginForm = document.getElementById('admin-login-form');
            const loginError = document.getElementById('login-error');
            
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                
                // Vérification des identifiants
                const validCredentials = adminCredentials.find(
                    cred => cred.username === username && cred.password === password
                );
                
                if (validCredentials) {
                    // Redirection vers le tableau de bord d'administration
                    window.location.href = 'admin-dashboard.html';
                } else {
                    // Afficher l'erreur
                    loginError.style.display = 'block';
                    
                    // Animer l'erreur
                    loginError.style.animation = 'none';
                    setTimeout(function() {
                        loginError.style.animation = 'shake 0.5s';
                    }, 10);
                }
            });
            
            // Gestion de l'affichage du mot de passe
            const passwordToggle = document.getElementById('password-toggle');
            const passwordInput = document.getElementById('password');
            
            passwordToggle.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                // Changer l'icône
                const icon = this.querySelector('i');
                if (type === 'password') {
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                } else {
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                }
            });
            
            // Style pour l'animation de l'erreur
            const style = document.createElement('style');
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
        });