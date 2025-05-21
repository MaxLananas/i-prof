document.addEventListener('DOMContentLoaded', function() {
            // Boutons de navigation entre les étapes
            const step1Next = document.getElementById('step1-next');
            const step2Back = document.getElementById('step2-back');
            const step2Send = document.getElementById('step2-send');
            const step2Next = document.getElementById('step2-next');
            const step3Back = document.getElementById('step3-back');
            const step3Submit = document.getElementById('step3-submit');
            
            // Indicateurs d'étapes
            const step1Indicator = document.getElementById('step1-indicator');
            const step2Indicator = document.getElementById('step2-indicator');
            const step3Indicator = document.getElementById('step3-indicator');
            
            // Étapes du formulaire
            const step1 = document.getElementById('step1');
            const step2 = document.getElementById('step2');
            const step3 = document.getElementById('step3');
            const step4 = document.getElementById('step4');
            
            // Autres éléments
            const verificationCodeContainer = document.getElementById('verification-code-container');
            const resendCodeBtn = document.getElementById('resend-code');
            const countdownElement = document.getElementById('countdown');
            const codeInputs = document.querySelectorAll('.code-input');
            
            // Étape 1 vers Étape 2
            step1Next.addEventListener('click', function() {
                const identification = document.getElementById('identification').value;
                const dateNaissance = document.getElementById('date_naissance').value;
                
                if (!identification || !dateNaissance) {
                    alert('Veuillez remplir tous les champs obligatoires.');
                    return;
                }
                
                // Passer à l'étape 2
                step1.classList.remove('active');
                step2.classList.add('active');
                
                // Mettre à jour les indicateurs
                step1Indicator.classList.remove('active');
                step2Indicator.classList.add('active');
            });
            
            // Étape 2 retour à Étape 1
            step2Back.addEventListener('click', function() {
                step2.classList.remove('active');
                step1.classList.add('active');
                
                // Réinitialiser l'étape 2
                verificationCodeContainer.style.display = 'none';
                step2Send.style.display = 'block';
                step2Next.style.display = 'none';
                
                // Mettre à jour les indicateurs
                step2Indicator.classList.remove('active');
                step1Indicator.classList.add('active');
            });
            
            // Envoyer le code de vérification
            step2Send.addEventListener('click', function() {
                // Simuler l'envoi du code
                verificationCodeContainer.style.display = 'block';
                this.style.display = 'none';
                step2Next.style.display = 'block';
                
                // Mettre le focus sur le premier champ du code
                codeInputs[0].focus();
                
                // Simuler un compte à rebours pour renvoyer le code
                startCountdown(60);
            });
            
            // Gestion de la saisie du code
            codeInputs.forEach((input, index) => {
                input.addEventListener('keyup', function(e) {
                    // Si un chiffre est saisi
                    if (e.key >= 0 && e.key <= 9) {
                        // Passer au champ suivant
                        if (index < codeInputs.length - 1) {
                            codeInputs[index + 1].focus();
                        }
                    } else if (e.key === 'Backspace') {
                        // Aller au champ précédent si Backspace est pressé
                        if (index > 0) {
                            codeInputs[index - 1].focus();
                        }
                    }
                });
            });
            
            // Renvoyer le code
            resendCodeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Désactiver le bouton
                this.style.display = 'none';
                countdownElement.style.display = 'inline';
                
                // Réinitialiser les champs de code
                codeInputs.forEach(input => input.value = '');
                
                // Mettre le focus sur le premier champ
                codeInputs[0].focus();
                
                // Démarrer le compte à rebours
                startCountdown(60);
            });
            
            // Étape 2 vers Étape 3
            step2Next.addEventListener('click', function() {
                // Vérifier que tous les champs du code sont remplis
                let codeComplete = true;
                codeInputs.forEach(input => {
                    if (!input.value) {
                        codeComplete = false;
                    }
                });
                
                if (!codeComplete) {
                    alert('Veuillez saisir le code de vérification complet.');
                    return;
                }
                
                // Simuler la vérification du code et passer à l'étape 3
                step2.classList.remove('active');
                step3.classList.add('active');
                
                // Mettre à jour les indicateurs
                step2Indicator.classList.remove('active');
                step3Indicator.classList.add('active');
            });
            
            // Étape 3 retour à Étape 2
            step3Back.addEventListener('click', function() {
                step3.classList.remove('active');
                step2.classList.add('active');
                
                // Mettre à jour les indicateurs
                step3Indicator.classList.remove('active');
                step2Indicator.classList.add('active');
            });
            
            // Soumettre le nouveau mot de passe
            step3Submit.addEventListener('click', function() {
                const newPassword = document.getElementById('new_password').value;
                const confirmPassword = document.getElementById('confirm_password').value;
                
                if (!newPassword || !confirmPassword) {
                    alert('Veuillez remplir tous les champs obligatoires.');
                    return;
                }
                
                if (newPassword !== confirmPassword) {
                    alert('Les mots de passe ne correspondent pas.');
                    return;
                }
                
                // Vérifier la complexité du mot de passe
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
                if (!passwordRegex.test(newPassword)) {
                    alert('Le mot de passe ne respecte pas les critères de sécurité requis.');
                    return;
                }
                
                // Simuler la réinitialisation du mot de passe et afficher la confirmation
                step3.classList.remove('active');
                step4.classList.add('active');
            });
            
            // Fonction pour gérer le compte à rebours
            function startCountdown(seconds) {
                let remainingSeconds = seconds;
                
                countdownElement.textContent = `(${remainingSeconds}s)`;
                
                const countdownInterval = setInterval(function() {
                    remainingSeconds--;
                    countdownElement.textContent = `(${remainingSeconds}s)`;
                    
                    if (remainingSeconds <= 0) {
                        clearInterval(countdownInterval);
                        resendCodeBtn.style.display = 'inline';
                        countdownElement.style.display = 'none';
                    }
                }, 1000);
            }
            
            // Boutons de connexion
            const loginButtons = document.querySelectorAll('.btn-login');
            
            loginButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = 'index.html';
                });
            });
        });