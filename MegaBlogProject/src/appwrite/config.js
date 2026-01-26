import conf from '../conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Services {
    client = new Client();
    database;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteRrojectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPst({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaesId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId

                }
            )
        }
    }

    async updatePost(slug,{title,content, featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDtabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )

        }catch(error){
            console.log("Appwite service :: updatePost :: error",error);
        }
    }

     async deletePost(slug){
        try{
             await this.databases.deleteDocument(
                conf.appwriteDtabaseId,
                conf.appwriteCollectionId,
                slug,
             )
             return true;
        

        }catch(error){
            console.log("Appwite service :: updatePost :: error",error);
            return false;
        }
    }

     async getPost(slug){
        try{
             return await this.databases.getDocument(
                conf.appwriteDtabaseId,
                conf.appwriteCollectionId,
                slug,
             )
             return true;
        

        }catch(error){
            console.log("Appwite service :: updatePost :: error",error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try{
             return await this.databases.listDocument(
                conf.appwriteDtabaseId,
                conf.appwriteCollectionId,
                queries,
            
             )
             return true;
        

        }catch(error){
            console.log("Appwite service :: updatePost :: error",error);
            return false;
        }
    }
}


const service = new Service()
export default service