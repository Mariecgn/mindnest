--creation de la base
CREATE DATABASE mental_app;
USE mental_app;

--creation table user
CREATE TABLE utilisateur (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50),
  prenom VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  motDePasse VARCHAR(255),
  telephone VARCHAR(20),
  fiches_lues INT DEFAULT 0,
  quizz_termines INT DEFAULT 0
);
--creation table fiche 
CREATE TABLE fiche (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(100),
  contenu TEXT,
  categorie VARCHAR(100),
  image VARCHAR(100)
);

--fiches insérées
INSERT INTO fiche (titre, contenu, categorie, image) VALUES
('Anxiété', 'L’anxiété est une réponse normale au stress, mais elle peut devenir problématique lorsqu’elle est intense, fréquente ou prolongée.\n\n📌 Quand cela apparaît ?\n- Avant une situation importante (examens, entretiens...)\n- En cas d\'incertitude ou de peur de l’échec\n\n🧘 Que faire ?\n- Respirer profondément\n- Éviter les stimulants (café, écrans...)\n- Parler à quelqu’un, ou consulter si besoin', 'émotion', 'angoisse'),

('Phobie Sociale', 'La phobie sociale, aussi appelée anxiété sociale, est une peur intense d’être jugé, observé ou rejeté dans des situations sociales ou de performance.\n\n📍 Quand cela se manifeste ?\n- Lorsqu’il faut parler en public ou en groupe\n- Lors d’interactions avec des inconnus\n- En mangeant ou écrivant en présence d’autrui\n\n🧠 Comment ça se ressent ?\n- Crainte de rougir, transpirer, bégayer ou trembler\n- Besoin d’éviter les situations sociales\n- Pensées négatives (“je vais paraître ridicule”, “on va me juger”)\n\n💡 Que faire ?\n- Commencer par affronter de petites situations sociales\n- Respirer profondément pour calmer le corps\n- Se rappeler que tout le monde peut être maladroit, et que c’est OK\n- En parler à un thérapeute, notamment en thérapie cognitivo-comportementale (TCC)', 'phobie', 'phobie_sociale'),

('TDAH', 'Le TDAH (Trouble Déficit de l’Attention avec ou sans Hyperactivité) est un trouble neurodéveloppemental qui affecte la concentration, l’impulsivité et parfois l’activité motrice.\n\n🧠 Comment ça se manifeste ?\n- Difficultés à rester concentré longtemps\n- Tendance à l’impulsivité (agir sans réfléchir)\n- Hyperactivité (besoin constant de bouger ou parler)\n- Oublis fréquents, désorganisation\n\n💬 Ce que ça peut provoquer\n- Frustration, fatigue mentale, sentiment de dévalorisation\n- Incompréhensions avec les autres (école, famille, travail)\n\n💡 Que faire ?\n- Utiliser des routines et outils visuels pour s’organiser\n- Travailler par petites sessions avec des pauses\n- En parler à un professionnel (diagnostic, accompagnement)\n- Valoriser ses points forts : créativité, énergie, intuition', 'neurodéveloppemental', 'tdah'),

('Dépression', 'La dépression est une maladie mentale fréquente qui se manifeste par une profonde tristesse, une perte d’intérêt et des troubles physiques.\n\n🧠 Symptômes fréquents :\n- Tristesse persistante\n- Fatigue extrême\n- Perte de plaisir\n\n🧰 Que faire ?\n- Parler à un professionnel\n- Prendre un traitement si nécessaire\n- Maintenir une routine et du soutien social', 'trouble mental', 'depression'),

('Addiction', 'L’addiction est une dépendance à une substance (alcool, drogue) ou un comportement (jeux, écrans) entraînant une perte de contrôle.\n\n📌 Signes :\n- Besoin irrépressible\n- Difficulté à s’arrêter malgré les conséquences\n\n🧠 Aide :\n- Thérapies cognitivo-comportementales\n- Groupes de soutien\n- Accompagnement médical', 'comportement', 'addiction'),

('TCA', 'Les Troubles du Comportement Alimentaire regroupent l’anorexie, la boulimie ou l’hyperphagie. Ils perturbent gravement la relation à la nourriture et à l’image corporelle.\n\n⚠️ Manifestations :\n- Contrôle extrême de l’alimentation\n- Compulsions alimentaires suivies de culpabilité\n- Souffrance liée au corps\n\n🧩 Aide :\n- Thérapie spécialisée (TCC, systémique...)\n- Soutien nutritionnel et psychologique\n- Prise en charge précoce', 'trouble alimentaire', 'tca'),

('TSPT', 'Le Trouble de Stress Post-Traumatique apparaît après un événement traumatique (accident, agression, guerre...).\n\n🚨 Symptômes :\n- Reviviscences, cauchemars\n- Hypervigilance, anxiété\n- Évitement des situations rappelant le trauma\n\n🧘 Que faire ?\n- Thérapie d’exposition ou EMDR\n- Soutien psychologique\n- Prise en charge adaptée', 'trauma', 'tspt');