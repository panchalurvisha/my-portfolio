from PIL import Image

def make_transparent(img_path, output_path):
    img = Image.open(img_path)
    frames = []
    
    for frame in range(0, getattr(img, "n_frames", 1)):
        img.seek(frame)
        rgba = img.convert("RGBA")
        data = rgba.getdata()
        
        newData = []
        for item in data:
            # check for white or near white
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
                
        rgba.putdata(newData)
        frames.append(rgba)
        
    frames[0].save(
        output_path, 
        save_all=True, 
        append_images=frames[1:], 
        loop=0, 
        disposal=2,
        duration=img.info.get('duration', 100)
    )
    print("Done")

make_transparent(r"d:\uru\portfolio\public\hero\f4d70058-c908-11ee-85d6-2770a5bfaaec.gif", r"d:\uru\portfolio\public\hero\f4d70058_transparent.gif")
