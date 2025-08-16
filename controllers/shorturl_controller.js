import urlModel from '../models/url_model.js'
// import dns from 'dns'

export const shortUrlController = async (req,res) =>{
    
    try{
        console.log('\n\n')
        console.log(req.body)
        const {url} = req.body        

        // validate url
        let validUrl = false        
        try{
            const tempUrl = new URL(url)
            if(tempUrl.protocol === 'https:' || tempUrl.protocol === 'http:'){
                validUrl = true
            }        
        }catch(err){
            console.error(err)
            validUrl = false
        }

        if(!validUrl){
            console.log('invalid url')
            res.json({error: 'invalid url'})
            return
        }        
                

        // check if already exists
        const existingUrl = await urlModel.findOne({"original_url":url})
        if(existingUrl){
            res.status(200).json({original_url: url,short_url:existingUrl.short_url})
            return
        }

        //find the max value
        const lastEntry = await urlModel.findOne().sort({ short_url: -1 });
        const nextShortUrl = lastEntry ? lastEntry.short_url + 1 : 1;
        console.log(nextShortUrl)

        // save new record        
        const newUrl = new urlModel({
            original_url: url,
            short_url: nextShortUrl 
        })
        await newUrl.save()

        res.status(200).json({original_url: url,short_url:nextShortUrl})
    }catch(err){
        console.error(err)
        res.status(500).json({message:"An unexpected error has occured"})
    }

}


export const getUrlController = async (req,res) =>{
    try{        
        const shortUrlInput = req.params.shorturl

        console.log(shortUrlInput)

        // check if already exists
        const existingUrl = await urlModel.findOne({"short_url":shortUrlInput})
        if(!existingUrl){
            res.status(404).json({message: "no url found"})            
            return
        }
        return res.redirect(existingUrl.original_url)

    }catch(err){
        console.error(err)
        res.status(500).json({message: "An unexpected error has occured"})
    }
}