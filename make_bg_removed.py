import collections
from PIL import Image

def remove_background_bfs(img_path, output_path, tolerance=30):
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    visited = set()
    queue = collections.deque([(0,0), (width-1, 0), (0, height-1), (width-1, height-1)])
    
    target_r, target_g, target_b = 255, 255, 255
    
    while queue:
        x, y = queue.popleft()
        if (x, y) in visited:
            continue
        visited.add((x, y))
        
        r, g, b, a = pixels[x, y]
        
        if abs(r - target_r) <= tolerance and abs(g - target_g) <= tolerance and abs(b - target_b) <= tolerance:
            pixels[x, y] = (255, 255, 255, 0)
            
            if x > 0: queue.append((x-1, y))
            if x < width - 1: queue.append((x+1, y))
            if y > 0: queue.append((x, y-1))
            if y < height - 1: queue.append((x, y+1))
            
    img.save(output_path, "PNG")
    print(f"Saved {output_path}")

remove_background_bfs(r"d:\uru\portfolio\public\hero\download.jpg", r"d:\uru\portfolio\public\hero\download_bg_removed.png")
remove_background_bfs(r"d:\uru\portfolio\public\hero\ad6c746dae7edb887d8c60a0727dd4df.jpg", r"d:\uru\portfolio\public\hero\ad6c746dae7edb887d8c60a0727dd4df_bg_removed.png")
