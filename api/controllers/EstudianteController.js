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
		
		var params = {
			    Bucket: BUCKET_NAME,
			    Key: req.param('txtnombre') + ".jpg",
			    Body: req.file('avatar'),
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

