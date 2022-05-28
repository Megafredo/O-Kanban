BEGIN;

INSERT INTO "tag"("name", "color")
VALUES
    ('note', '#4B4453'),
    ('todo', '#FD7751'),
    ('info', '#7D1E6A'),
    ('important', '#6A67CE'),
    ('success', '#6D8B74'),
    ('help', '#EC994B'),
    ('question', '#97C4B8'),
    ('warning', '#FFCD38'),
    ('social', '#9D0A78'),
    ('bug', '#DB3965'),
    ('tips', '#187498'),
    ('search', '#36AE7C'),
    ('doc', '#EB5353');

INSERT INTO "user"("firstname", "lastname", "email", "password")
VALUES
    ('a','a','a@a.com','a'),
    ('b','b','b@b.com','b'),
    ('c','c','c@c.com','c');

INSERT INTO "list"("title", "description", "user_id")
VALUES
    ('Todo','Finir les challenges à temps',1),
    ('Mon Combat','Toujours en cours',1),
    ('Le titre n''as aucun sens','...la description aussi',2),
    ('Le dev c''est cool !','Mais attention aux coups de soleil ;)',3);

INSERT INTO "card"("title", "order", "color", "description", "user_id", "list_id")
VALUES
    ('1 Title Card 1',1,'#F9F871','Les choses à faire',1, 1),
    ('2 Title Card 2',2,'#FFC75F','Les choses à faire',2, 1),
    ('3 Title Card 3',3,'#FF9671','Les choses à faire',3, 1),
    ('1 Title Card 1',1,'#FF6F91','Les choses à faire',1, 2),
    ('2 Title Card 2',2,'#D65DB1','Les choses à faire',2, 2),
    ('3 Title Card 3',3,'#845EC2','Les choses à faire',3, 2),
    ('1 Title Card 1',1,'#2C73D2','Les choses à faire',1, 3),
    ('2 Title Card 2',2,'#0081CF','Les choses à faire',2, 3),
    ('3 Title Card 3',3,'#0089BA','Les choses à faire',3, 3),
    ('1 Title Card 1',1,'#008E9B','Les choses à faire',1, 4),
    ('2 Title Card 2',2,'#008F7A','Les choses à faire',2, 4),
    ('3 Title Card 3',3,'#00C9A7','Les choses à faire',3, 4);

INSERT INTO "card_has_tag"("card_id", "tag_id") VALUES
(1,1),
(1,2),
(2,3),
(2,4),
(3,5),
(3,6),
(4,7),
(4,8),
(5,9),
(5,10),
(6,11),
(6,12);


COMMIT;