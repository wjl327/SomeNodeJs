
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'King of The World' });
};