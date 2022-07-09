
export default function errorAPI(err, req, res, code){
    res.status(code).json(err.message);
}

// // Bad request
// function _400(err, req, res) {
//     res.status(400).json(err.message );
// }
// // Unauthorized
// function _401(err, req, res) {
//     res.status(401).json(err.message );
// }
// // Forbidden
// function _403(err, req, res) {
//     res.status(403).json(err.message );
// }
// // Not found
// function _404(err, req, res) {
//     res.status(404).json(err.message);
// }
// // Internal Server Error
// function _500(err, req, res) {
//     res.status(500).json({ 'Server Error 500': err.message });
// }

// export { _400, _401, _403, _404, _500 };

