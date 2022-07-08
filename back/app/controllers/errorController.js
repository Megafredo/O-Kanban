// Bad request
function _400(err, req, res) {
    res.status(400).json(err.message );
}
// Unauthorized
function _401(err, req, res) {
    res.status(401).json(err.message );
}
// Forbidden
function _403(err, req, res) {
    res.status(403).json(err.message );
}
// Not found
function _404(req, res) {
    res.status(404).json({ 'Error 404': 'Page Not Found' });
}
// Internal Server Error
function _500(err, req, res) {
    res.status(500).json({ 'Server Error 500': err.message });
}

export { _400, _401, _403, _404, _500 };
