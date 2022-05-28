function _400(req, res) { 
    res.status(400).send('BAD REQUEST')};

function _401(req, res) { 
    res.status(401).send('AUTHENTIFICATION ERROR')};

function _403(req, res) {
    res.status(403).send('ACCESS DENIED')};

export default function _404(err, req, res) {
    res.status(404).json({"Error 404": err.message ? err.message : "PAGE NOT FOUND"})};

function _500(err,req, res) {
    res.status(500).json({"Error 500" : err.message});
};

export { _400, _401,_403, _500 };