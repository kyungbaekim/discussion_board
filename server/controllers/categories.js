var mongoose = require('mongoose');
var Categories = mongoose.model('Categories');
var category_list = ['PHP', 'MEAN', 'Ruby on Rails', 'ios', 'Python', 'React', 'Web Development'];

module.exports = {
  index: function(req, res) {
    Categories.find({}, function(err, categories){
      if(err){
        res.json(err);
      }
      else{
        console.log(categories);
        if(!categories.length > 0){
          console.log('category is empty');
          for(var i=0; i<category_list.length; i++){
            var category = new Categories({category: category_list[i]});
            console.log(category_list[i]);
            category.save(function(err, category) {
              if(err) {
                console.log(err);
              }
            })
          }
        }
        res.json(categories);
      }
    })
  }
}
