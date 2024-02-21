const Image = () => {
    return(
        <form action="/upload" method="post" encType="multipart/form-data">
        <input type="file" name="image" />
        <button type="submit" className=" bg-red-400 text-slate-100 p-3 rounded-lg">Upload</button>
        </form>
    )
}

export default Image;