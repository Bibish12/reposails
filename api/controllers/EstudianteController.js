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

		// se guarda la imagen en bitbucket
		const AWS = require('aws-sdk');
		const fs = require('fs');
		
		const path = require('path');

		const BUCKET_NAME = 'pruebasails';
		const IAM_USER_KEY = 'AKIAJYOH6EKNWFPXMCFQ';
		const IAM_USER_SECRET = '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';
		const REGION = 'us-east-2';

		let s3bucket = new AWS.S3({
		   accessKeyId: IAM_USER_KEY,
		   secretAccessKey: IAM_USER_SECRET,
		   Bucket: BUCKET_NAME,
		   region: REGION
		 });


		/*req.file('avatar').upload({
		  dirname: require('path').resolve(sails.config.appPath, 'assets/images')
		},function (err, uploadedFiles) {
		  if (err) return res.serverError(err);

		  return res.json({
		    message: uploadedFiles.length + ' file(s) uploaded successfully!'
		  });
		});*/


		//const filePath = path.join(process.cwd(), '/images/assets/perfil.jpg');

		//console.log(filePath);
		res.setTimeout(0);
		
		var params = {
			    Bucket: BUCKET_NAME,
			    Key: req.param('avatar'),
			    Body: req.file('avatar')//fs.createReadStream(filePath),
			 };

		s3bucket.upload(params, function (err, data) {
			
				//cuando ocurre un problema se informa que no se pudo subir la imagen
				if (err) {
				    console.log('No se pudo subir la imagen :(');
				    console.log(err);
			    } else{

				    // caso contrario se guarda el estudiante
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

				    console.log('success');
				    console.log(data);
				}
		});
			
	   
	}

		
	
};

