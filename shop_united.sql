-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Hôte : mysql:3306
-- Généré le :  sam. 18 jan. 2020 à 21:26
-- Version du serveur :  5.7.28
-- Version de PHP :  7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `shop_united`
--

-- --------------------------------------------------------

--
-- Structure de la table `disliked_shops`
--

CREATE TABLE `disliked_shops` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_shop` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `liked_shops`
--

CREATE TABLE `liked_shops` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_shop` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `shops_info`
--

CREATE TABLE `shops_info` (
  `id` int(11) NOT NULL,
  `shop_name` varchar(50) COLLATE utf8_bin NOT NULL,
  `Shop_cover_image` varchar(255) COLLATE utf8_bin NOT NULL,
  `shop_latitude` varchar(50) COLLATE utf8_bin NOT NULL,
  `shop_longitude` varchar(50) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `shops_info`
--

INSERT INTO `shops_info` (`id`, `shop_name`, `Shop_cover_image`, `shop_latitude`, `shop_longitude`) VALUES
(13, 'shop one', 'https://www.myeventgateway.com/media/stall_placeholder.jpg', '33.14109999999995', '-6.646300000000005'),
(14, 'shop two', 'https://www.myeventgateway.com/media/stall_placeholder.jpg', '33.15109999999995', '-6.636300000000006'),
(15, 'shop three', 'https://www.myeventgateway.com/media/stall_placeholder.jpg', '33.16109999999995', '-6.626300000000006'),
(16, 'shop four', 'https://www.myeventgateway.com/media/stall_placeholder.jpg', '33.171099999999946', '-6.616300000000006'),
(17, 'shop five', 'https://www.myeventgateway.com/media/stall_placeholder.jpg', '33.181099999999944', '-6.606300000000006'),
(18, 'shop six', 'https://www.myeventgateway.com/media/stall_placeholder.jpg', '33.19109999999994', '-6.5963000000000065'),
(19, 'shop seven', 'https://www.myeventgateway.com/media/stall_placeholder.jpg', '33.20109999999994', '-6.586300000000007'),
(20, 'shop eight', 'https://www.myeventgateway.com/media/stall_placeholder.jpg', '33.21109999999994', '-6.576300000000007'),
(21, 'shop nine', 'https://www.myeventgateway.com/media/stall_placeholder.jpg', '33.221099999999936', '-6.566300000000007'),
(22, 'shop ten', 'https://www.myeventgateway.com/media/stall_placeholder.jpg', '33.231099999999934', '-6.556300000000007'),
(23, 'shop eleven', 'https://www.myeventgateway.com/media/stall_placeholder.jpg', '33.24109999999993', '-6.546300000000008'),
(24, 'shop twelve', 'https://www.myeventgateway.com/media/stall_placeholder.jpg', '33.25109999999993', '-6.536300000000008');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) COLLATE utf8_bin NOT NULL,
  `password` varchar(250) COLLATE utf8_bin NOT NULL,
  `user_latitude` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT '33.50109999999988',
  `user_longitude` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT '-6.286300000000013'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `disliked_shops`
--
ALTER TABLE `disliked_shops`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `liked_shops`
--
ALTER TABLE `liked_shops`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `shops_info`
--
ALTER TABLE `shops_info`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `disliked_shops`
--
ALTER TABLE `disliked_shops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `liked_shops`
--
ALTER TABLE `liked_shops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT pour la table `shops_info`
--
ALTER TABLE `shops_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
