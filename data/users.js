const bcrypt = require('bcryptjs')

const dotenv = require('dotenv')
dotenv.config()
var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose
seeder.connect(process.env.db, function() {
 
  // Load Mongoose models
  seeder.loadModels(['backend/models/referrerModel']);
 
  // Clear specified collections
  seeder.clearModels(['Referrer'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function(err,done) {
    if(err){
    console.log(err)
    }else{
        console.log("successful")
    }
      seeder.disconnect();
    });
 
  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'Referrer',
        'documents': [
            {
                username: 'ceamc',
                password: bcrypt.hashSync('12-ceamc-21', 10)
            },
            {
                username: 'ceagz',
                password: bcrypt.hashSync('211-ceagz-112', 10)
            },
            {
                username: 'celz5',
                password: bcrypt.hashSync('109-celz5-901', 10)
            },
            {
                username: 'celvz',
                password: bcrypt.hashSync('409-celvz-904', 10)
            },
            {
                username: 'celz1',
                password: bcrypt.hashSync('z1-celz1-1z', 10)
            },
            {
                username: 'celz2',
                password: bcrypt.hashSync('201-celz2-102', 10)
            },
            {
                username: 'cewmc',
                password: bcrypt.hashSync('009-cewmc-900', 10)
            },
            {
                username: 'cecmc',
                password: bcrypt.hashSync('111-cecmc-111', 10)
            },
            {
                username: 'cessz1',
                password: bcrypt.hashSync('zs1-cessz1-1sz', 10)
            },
            {
                username: 'cesaz1',
                password: bcrypt.hashSync('455-cesaz1-544', 10)
            },
            {
                username: 'celz3',
                password: bcrypt.hashSync('5099-celz3-9905', 10)
            },
            {
                username: 'cenwz2',
                password: bcrypt.hashSync('789-cenwz2-987', 10)
            },
            {
                username: 'cesez1',
                password: bcrypt.hashSync('212-cesez1-212', 10)
            },
            {
                username: 'cessz2',
                password: bcrypt.hashSync('665-cessz2-566', 10)
            },
            {
                username: 'ceukz4',
                password: bcrypt.hashSync('432-ceukz4-234', 10)
            },
            {
                username: 'ceukz1',
                password: bcrypt.hashSync('878-ceukz1-878', 10)
            },
            {
                username: 'ceukz2',
                password: bcrypt.hashSync('0902-ceukz2-2090', 10)
            },
            {
                username: 'ceukz3',
                password: bcrypt.hashSync('3355-ceukz3-5533', 10)
            },
            {
                username: 'celz4',
                password: bcrypt.hashSync('3332-celz4-2333', 10)
            },
            {
                username: 'cenwz1',
                password: bcrypt.hashSync('45533-cenwz1-33544', 10)
            },
            {
                username: 'cenez1',
                password: bcrypt.hashSync('23533-cenez1-33532', 10)
            },
            {
                username: 'cesez2',
                password: bcrypt.hashSync('2211-cesez2-1122', 10)
            },
            {
                username: 'cebz2',
                password: bcrypt.hashSync('6757-cebz2-7576', 10)
            },
            {
                username: 'ceenecz',
                password: bcrypt.hashSync('0878-ceenecz-8780', 10)
            },
            {
                username: 'cekz',
                password: bcrypt.hashSync('2121-cekz-1212', 10)
            },
        
            {
                username: 'blwcm',
                password: bcrypt.hashSync('1234-blwcm-3214', 10)
            },
        
            {
                username: 'ceavz',
                password: bcrypt.hashSync('8930-ceavz-3028', 10)
            },
        
        
            {
                username: 'cemcabeokuta',
                password: bcrypt.hashSync('1310-cemcabeokuta-9900', 10)
            },
        
        
            {
                username: 'ceabz',
                password: bcrypt.hashSync('ceabz-3310-8890', 10)
            },
        
        
            {
                username: 'cebz1',
                password: bcrypt.hashSync('1023-cebz1-8932', 10)
            },
        
        
        
            {
                username: 'cemwz',
                password: bcrypt.hashSync('50-cemwz-9021', 10)
            },
        
        
        
            {
                username: 'ceoz',
                password: bcrypt.hashSync('509-ceoz-9800', 10)
            },
        
            {
                username: 'cemcph',
                password: bcrypt.hashSync('5012-cemcph-700', 10)
            },
        
            {
                username: 'cephz1',
                password: bcrypt.hashSync('103-cephz1-301', 10)
            },
            {
                username: 'cephz2',
                password: bcrypt.hashSync('3223-cephz2-1042', 10)
            },
            {
                username: 'cephz3',
                password: bcrypt.hashSync('302-cephz3-980', 10)
            },
            {
                username: 'cephz2',
                password: bcrypt.hashSync('3223-cephz2-1042', 10)
            },
            {
                username: 'cencz1',
                password: bcrypt.hashSync('8012-cencz1-9043', 10)
            },
            
            {
                username: 'cencz2',
                password: bcrypt.hashSync('3993-cencz2-4848', 10)
            },
            {
                username: 'ceswz1',
                password: bcrypt.hashSync('ceswz1-50323-4434', 10)
            },
            {
                username: 'ceswz2',
                password: bcrypt.hashSync('ceswz2-4034-9040', 10)
            },
            {
                username: 'ceswz3',
                password: bcrypt.hashSync('0923-ceewcaz1-0829', 10)
            },
            {
                username: 'ceewcaz1',
                password: bcrypt.hashSync('ceswz2-4034-9040', 10)
            },
            {
                username: 'ceewcaz2',
                password: bcrypt.hashSync('9023-ceewcaz2-888', 10)
            },
            {
                username: 'ceewcaz3',
                password: bcrypt.hashSync('03-ceewcaz3-9031', 10)
            },
            {
                username: 'ceewcaz4',
                password: bcrypt.hashSync('40-ceewcaz4-0002', 10)
            },
            {
                username: 'ceewcaz5',
                password: bcrypt.hashSync('880-ceewcaz5-0101', 10)
            },
         {
    username: 'link1',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link2',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link3',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link4',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link5',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link6',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link7',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link8',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link9',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link10',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link11',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link12',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link13',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link14',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link15',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link16',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link17',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link18',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link19',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
{
    username: 'link20',
    password: bcrypt.hashSync('12-ceamc-21', 10)
},
            {
                username: 'ceewcaz6',
                password: bcrypt.hashSync('50-ceewcaz6-1012', 10)
            },
            {
                username: 'cechad',
                password: bcrypt.hashSync('60-cechad-9090', 10)
            },
            {
                username: 'cesaz2',
                password: bcrypt.hashSync('129-cesaz2-5950', 10)
            },
            {
                username: 'cesaz3',
                password: bcrypt.hashSync('30-cesaz3-9043', 10)
            },
            {
                username: 'cesaz4',
                password: bcrypt.hashSync('9049-cesaz4-9034', 10)
            },
            {
                username: 'cesaz5',
                password: bcrypt.hashSync('cesaz5-30302030', 10)
            },
            {
                username: 'ceumuahia',
                password: bcrypt.hashSync('ceumuahia-932019', 10)
            },
            {
                username: 'ceabakaliki1',
                password: bcrypt.hashSync('ceabakaliki1-201938', 10)
            },
        
            {
                username: 'ceenugu1',
                password: bcrypt.hashSync('ceenugu1-9022334', 10)
            },
        
            {
                username: 'ceowerri',
                password: bcrypt.hashSync('ceowerri-1234584', 10)
            },
            {
                username: 'ceabakaliki2',
                password: bcrypt.hashSync('ceabakaliki2-201934', 10)
            },
        
            {
                username: 'ceenugu2',
                password: bcrypt.hashSync('ceenugu2-9022334', 10)
            },
        
            {
                username: 'ceabakaliki2',
                password: bcrypt.hashSync('ceabakaliki2-201934', 10)
            },
        
        
            {
                username: 'ceindia',
                password: bcrypt.hashSync('ceindia-4503945', 10)
            },
        
        
            {
                username: 'cenewdelhi',
                password: bcrypt.hashSync('cenewdelhi-20394', 10)
            },
        
        
            {
                username: 'cepune',
                password: bcrypt.hashSync('cepune-239393', 10)
            },
        
        
            {
                username: 'ceuae',
                password: bcrypt.hashSync('ceuae-19238339', 10)
            },
        
            {
                username: 'cecregion',
                password: bcrypt.hashSync('cecregion-848447', 10)
            },
        
            {
                username: 'ceeeregion',
                password: bcrypt.hashSync('ceeeregion-930494', 10)
            },
        
            {
                username: 'ceez2',
                password: bcrypt.hashSync('ceez2-85858549', 10)
            },
        
            {
                username: 'ceez3',
                password: bcrypt.hashSync('ceez3-905839348', 10)
            },
        
            
            {
                username: 'ceez4',
                password: bcrypt.hashSync('ceez4-49939383', 10)
            },
        
            
            {
                username: 'ceez1',
                password: bcrypt.hashSync('ceez1-3039430333', 10)
            },
            {
                username: 'ceukr2z1',
                password: bcrypt.hashSync('ceukr2z1-3949494', 10)
            },    
            {
                username: 'ceukr2z2',
                password: bcrypt.hashSync('ceukr2z2-33993939', 10)
            },
           
            {
                username: 'ceukr2z3',
                password: bcrypt.hashSync('ceukr2z3-4943939', 10)
            },
        
            {
                username: 'ceukr2z4',
                password: bcrypt.hashSync('ceukr2z4-8598484', 10)
            },
        
            {
                username: 'ceusr1z1',
                password: bcrypt.hashSync('ceusr1z1-8494033', 10)
            },
        
            {
                username: 'ceusr1z2',
                password: bcrypt.hashSync('ceusr1z2-0904848', 10)
            },
        
            {
                username: 'ceusregion2',
                password: bcrypt.hashSync('ceusregion2-039339', 10)
            },
        
            {
                username: 'ceusregion3',
                password: bcrypt.hashSync('ceusregion3-9849499', 10)
            },
        
            {
                username: 'ceustexasz1',
                password: bcrypt.hashSync('ceustexasz1-944994', 10)
            },
        
            {
                username: 'ceusregion3',
                password: bcrypt.hashSync('ceusregion3-9849499', 10)
            },
        
            {
                username: 'ceustexasz1',
                password: bcrypt.hashSync('ceustexasz1-944994', 10)
            },
            {
                username: 'ceustexasz2',
                password: bcrypt.hashSync('ceustexasz2-984930', 10)
            },
        
            {
                username: 'cesapele',
                password: bcrypt.hashSync('cesapele-94883990', 10)
            },
        
            {
                username: 'cecalgary',
                password: bcrypt.hashSync('cecalgary-0938389', 10)
            },
            {
                username: 'cemcw',
                password: bcrypt.hashSync('009-cewmc-900', 10)
            },
            {
                username: 'lwghanazonea',
                password: bcrypt.hashSync('lwghanazonea-0938234', 10)
            },
            {
                username: 'lvzconnect',
                password: bcrypt.hashSync('095858-lvzconnect-0938234', 10)
            },
            {
                username: 'f',
                password: bcrypt.hashSync('095858-f-043354', 10)
            },
            {
                username: 's',
                password: bcrypt.hashSync('09897-s-032324', 10)
            },
           


            {
                username: 'c',
                password: bcrypt.hashSync('098878-c-0938234', 10)
            },
            {
                username: 'o',
                password: bcrypt.hashSync('009887-o-0938234', 10)
            },
        
            {
                username: 'j',
                password: bcrypt.hashSync('009878-j-0938234', 10)
            },
            {
                username: 'n',
                password: bcrypt.hashSync('092321-n-0938234', 10)
            },
            {
                username: 'b',
                password: bcrypt.hashSync('092321-b-0938234', 10)
            },
               {
                username: 'pastorpat',
                password: bcrypt.hashSync('029-pastorpat-38234', 10)
            }, 
            {
                username: 'lz1',
                password: bcrypt.hashSync('032434-lz1-6323711', 10),
                bankDetails: {
                    bankName: process.env.LZ1_BANK_NAME,
                    accountName: process.env.LZ1_ACCOUNT_NAME,
                    accountNum: process.env.LZ1_ACCOUNT_NUMBER
                }
            }
     
        ]
    }
];















// const users = [
//     {
//         username: 'ceamc',
//         password: bcrypt.hashSync('12-ceamc-21', 10)
//     },
//     {
//         username: 'ceagz',
//         password: bcrypt.hashSync('211-ceagz-112', 10)
//     },
//     {
//         username: 'celz5',
//         password: bcrypt.hashSync('109-celz5-901', 10)
//     },
//     {
//         username: 'celvz',
//         password: bcrypt.hashSync('409-celvz-904', 10)
//     },
//     {
//         username: 'celz1',
//         password: bcrypt.hashSync('z1-celz1-1z', 10)
//     },
//     {
//         username: 'celz2',
//         password: bcrypt.hashSync('201-celz2-102', 10)
//     },
//     {
//         username: 'cewmc',
//         password: bcrypt.hashSync('009-cewmc-900', 10)
//     },
//     {
//         username: 'cecmc',
//         password: bcrypt.hashSync('111-cecmc-111', 10)
//     },
//     {
//         username: 'cessz1',
//         password: bcrypt.hashSync('zs1-cessz1-1sz', 10)
//     },
//     {
//         username: 'cesaz1',
//         password: bcrypt.hashSync('455-cesaz1-544', 10)
//     },
//     {
//         username: 'celz3',
//         password: bcrypt.hashSync('5099-celz3-9905', 10)
//     },
//     {
//         username: 'cenwz2',
//         password: bcrypt.hashSync('789-cenwz2-987', 10)
//     },
//     {
//         username: 'cesez1',
//         password: bcrypt.hashSync('212-cesez1-212', 10)
//     },
//     {
//         username: 'cessz2',
//         password: bcrypt.hashSync('665-cessz2-566', 10)
//     },
//     {
//         username: 'ceukz4',
//         password: bcrypt.hashSync('432-ceukz4-234', 10)
//     },
//     {
//         username: 'ceukz1',
//         password: bcrypt.hashSync('878-ceukz1-878', 10)
//     },
//     {
//         username: 'ceukz2',
//         password: bcrypt.hashSync('0902-ceukz2-2090', 10)
//     },
//     {
//         username: 'ceukz3',
//         password: bcrypt.hashSync('3355-ceukz3-5533', 10)
//     },
//     {
//         username: 'celz4',
//         password: bcrypt.hashSync('3332-celz4-2333', 10)
//     },
//     {
//         username: 'cenwz1',
//         password: bcrypt.hashSync('45533-cenwz1-33544', 10)
//     },
//     {
//         username: 'cenez1',
//         password: bcrypt.hashSync('23533-cenez1-33532', 10)
//     },
//     {
//         username: 'cesez2',
//         password: bcrypt.hashSync('2211-cesez2-1122', 10)
//     },
//     {
//         username: 'cebz2',
//         password: bcrypt.hashSync('6757-cebz2-7576', 10)
//     },
//     {
//         username: 'ceenecz',
//         password: bcrypt.hashSync('0878-ceenecz-8780', 10)
//     },
//     {
//         username: 'cekz',
//         password: bcrypt.hashSync('2121-cekz-1212', 10)
//     },

//     {
//         username: 'blwcm',
//         password: bcrypt.hashSync('1234-blwcm-3214', 10)
//     },

//     {
//         username: 'ceavz',
//         password: bcrypt.hashSync('8930-ceavz-3028', 10)
//     },


//     {
//         username: 'cemcabeokuta',
//         password: bcrypt.hashSync('1310-cemcabeokuta-9900', 10)
//     },


//     {
//         username: 'ceabz',
//         password: bcrypt.hashSync('ceabz-3310-8890', 10)
//     },


//     {
//         username: 'cebz1',
//         password: bcrypt.hashSync('1023-cebz1-8932', 10)
//     },



//     {
//         username: 'cemwz',
//         password: bcrypt.hashSync('50-cemwz-9021', 10)
//     },



//     {
//         username: 'ceoz',
//         password: bcrypt.hashSync('509-ceoz-9800', 10)
//     },

//     {
//         username: 'cemcph',
//         password: bcrypt.hashSync('5012-cemcph-700', 10)
//     },

//     {
//         username: 'cephz1',
//         password: bcrypt.hashSync('103-cephz1-301', 10)
//     },
//     {
//         username: 'cephz2',
//         password: bcrypt.hashSync('3223-cephz2-1042', 10)
//     },
//     {
//         username: 'cephz3',
//         password: bcrypt.hashSync('302-cephz3-980', 10)
//     },
//     {
//         username: 'cephz2',
//         password: bcrypt.hashSync('3223-cephz2-1042', 10)
//     },
//     {
//         username: 'cencz1',
//         password: bcrypt.hashSync('8012-cencz1-9043', 10)
//     },
    
//     {
//         username: 'cencz2',
//         password: bcrypt.hashSync('3993-cencz2-4848', 10)
//     },
//     {
//         username: 'ceswz1',
//         password: bcrypt.hashSync('ceswz1-50323-4434', 10)
//     },
//     {
//         username: 'ceswz2',
//         password: bcrypt.hashSync('ceswz2-4034-9040', 10)
//     },
//     {
//         username: 'ceswz3',
//         password: bcrypt.hashSync('0923-ceewcaz1-0829', 10)
//     },
//     {
//         username: 'ceewcaz1',
//         password: bcrypt.hashSync('ceswz2-4034-9040', 10)
//     },
//     {
//         username: 'ceewcaz2',
//         password: bcrypt.hashSync('9023-ceewcaz2-888', 10)
//     },
//     {
//         username: 'ceewcaz3',
//         password: bcrypt.hashSync('03-ceewcaz3-9031', 10)
//     },
//     {
//         username: 'ceewcaz4',
//         password: bcrypt.hashSync('40-ceewcaz4-0002', 10)
//     },
//     {
//         username: 'ceewcaz5',
//         password: bcrypt.hashSync('880-ceewcaz5-0101', 10)
//     },
//     {
//         username: 'ceewcaz6',
//         password: bcrypt.hashSync('50-ceewcaz6-1012', 10)
//     },
//     {
//         username: 'cechad',
//         password: bcrypt.hashSync('60-cechad-9090', 10)
//     },
//     {
//         username: 'cesaz2',
//         password: bcrypt.hashSync('129-cesaz2-5950', 10)
//     },
//     {
//         username: 'cesaz3',
//         password: bcrypt.hashSync('30-cesaz3-9043', 10)
//     },
//     {
//         username: 'cesaz4',
//         password: bcrypt.hashSync('9049-cesaz4-9034', 10)
//     },
//     {
//         username: 'cesaz5',
//         password: bcrypt.hashSync('cesaz5-30302030', 10)
//     },
//     {
//         username: 'ceumuahia',
//         password: bcrypt.hashSync('ceumuahia-932019', 10)
//     },
//     {
//         username: 'ceabakaliki1',
//         password: bcrypt.hashSync('ceabakaliki1-201938', 10)
//     },

//     {
//         username: 'ceenugu1',
//         password: bcrypt.hashSync('ceenugu1-9022334', 10)
//     },

//     {
//         username: 'ceowerri',
//         password: bcrypt.hashSync('ceowerri-1234584', 10)
//     },
//     {
//         username: 'ceabakaliki2',
//         password: bcrypt.hashSync('ceabakaliki2-201934', 10)
//     },

//     {
//         username: 'ceenugu2',
//         password: bcrypt.hashSync('ceenugu2-9022334', 10)
//     },

//     {
//         username: 'ceabakaliki2',
//         password: bcrypt.hashSync('ceabakaliki2-201934', 10)
//     },


//     {
//         username: 'ceindia',
//         password: bcrypt.hashSync('ceindia-4503945', 10)
//     },


//     {
//         username: 'cenewdelhi',
//         password: bcrypt.hashSync('cenewdelhi-20394', 10)
//     },


//     {
//         username: 'cepune',
//         password: bcrypt.hashSync('cepune-239393', 10)
//     },


//     {
//         username: 'ceuae',
//         password: bcrypt.hashSync('ceuae-19238339', 10)
//     },

//     {
//         username: 'cecregion',
//         password: bcrypt.hashSync('cecregion-848447', 10)
//     },

//     {
//         username: 'ceeeregion',
//         password: bcrypt.hashSync('ceeeregion-930494', 10)
//     },

//     {
//         username: 'ceez2',
//         password: bcrypt.hashSync('ceez2-85858549', 10)
//     },

//     {
//         username: 'ceez3',
//         password: bcrypt.hashSync('ceez3-905839348', 10)
//     },

    
//     {
//         username: 'ceez4',
//         password: bcrypt.hashSync('ceez4-49939383', 10)
//     },

    
//     {
//         username: 'ceez1',
//         password: bcrypt.hashSync('ceez1-3039430333', 10)
//     },
//     {
//         username: 'ceukr2z1',
//         password: bcrypt.hashSync('ceukr2z1-3949494', 10)
//     },    
//     {
//         username: 'ceukr2z2',
//         password: bcrypt.hashSync('ceukr2z2-33993939', 10)
//     },
   
//     {
//         username: 'ceukr2z3',
//         password: bcrypt.hashSync('ceukr2z3-4943939', 10)
//     },

//     {
//         username: 'ceukr2z4',
//         password: bcrypt.hashSync('ceukr2z4-8598484', 10)
//     },

//     {
//         username: 'ceusr1z1',
//         password: bcrypt.hashSync('ceusr1z1-8494033', 10)
//     },

//     {
//         username: 'ceusr1z2',
//         password: bcrypt.hashSync('ceusr1z2-0904848', 10)
//     },

//     {
//         username: 'ceusregion2',
//         password: bcrypt.hashSync('ceusregion2-039339', 10)
//     },

//     {
//         username: 'ceusregion3',
//         password: bcrypt.hashSync('ceusregion3-9849499', 10)
//     },

//     {
//         username: 'ceustexasz1',
//         password: bcrypt.hashSync('ceustexasz1-944994', 10)
//     },

//     {
//         username: 'ceusregion3',
//         password: bcrypt.hashSync('ceusregion3-9849499', 10)
//     },

//     {
//         username: 'ceustexasz1',
//         password: bcrypt.hashSync('ceustexasz1-944994', 10)
//     },
//     {
//         username: 'ceustexasz2',
//         password: bcrypt.hashSync('ceustexasz2-984930', 10)
//     },

//     {
//         username: 'cesapele',
//         password: bcrypt.hashSync('cesapele-94883990', 10)
//     },

//     {
//         username: 'cecalgary',
//         password: bcrypt.hashSync('cecalgary-0938389', 10)
//     },

//     {
//         username: 'lwghanazonea',
//         password: bcrypt.hashSync('lwghanazonea-0938234', 10)
//     },
//     {
//         username: 'lvzconnect',
//         password: bcrypt.hashSync('095858-lvzconnect-0938234', 10)
//     },
//     {
//         username: 'f',
//         password: bcrypt.hashSync('095858-f-043354', 10)
//     },
//     {
//         username: 's',
//         password: bcrypt.hashSync('09897-s-032324', 10)
//     },

//     {
//         username: 'c',
//         password: bcrypt.hashSync('098878-c-0938234', 10)
//     },
//     {
//         username: 'o',
//         password: bcrypt.hashSync('009887-o-0938234', 10)
//     },

//     {
//         username: 'j',
//         password: bcrypt.hashSync('009878-j-0938234', 10)
//     },
//     {
//         username: 'n',
//         password: bcrypt.hashSync('092321-n-0938234', 10)
//     }

// ]

// module.exports = users;

















