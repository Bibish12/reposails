/**
 * EstudianteController
 *
 * @description :: Server-side logic for managing estudiantes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
		new:function (req, res){
		res.view()
	},
	
	create:function(req, res){
		var EstudianteObj={
			nombre:req.param('txtnombre')
		}
		Estudiante.create(EstudianteObj,function(err,user){
			if(err){ 
				console.log(JSON.stringify(err));
			    return res.redirect('/estudiantes');
			}
				res.redirect('/estudiante');
		});
	},



	uploadFile: function (req, res) {

		const options =
      	{ // This is the usual stuff
        	adapter: require('skipper-s3'),
	      		key: 'AKIAJYOH6EKNWFPXMCFQ',
		      	secret: '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',
		      	bucket: 'pruebasails',
		      	region: 'us-east-2',
	      	s3params:
	        	{ 
	        		ACL: 'public-read'
	        	},
      		onProgress: progress => sails.log.verbose('Upload progress:', progress)
     	}

		req.file('avatar').upload(options, (err, uploadedFiles) => {
		   if (err) return res.send(500, err);
				  return res.json({
				    message: uploadedFiles.length + ' file(s) uploaded successfully!',
				    files: uploadedFiles
				  });
		})
  	
  	}
	
	
};

