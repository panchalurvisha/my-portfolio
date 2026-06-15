const sharp = require('sharp');
const fs = require('fs');

async function run() {
  const files = ['public/projects/Screenshot 2026-06-15 172148.png', 'public/projects/Screenshot 2026-06-15 172112.png'];
  for (let file of files) {
    const backup = file + '.bak';
    // Create backup if it doesn't exist so we can run multiple times safely
    if (!fs.existsSync(backup)) {
      fs.copyFileSync(file, backup);
    }
    
    // Crop 140px from top and 60px from bottom (1080 - 140 - 60 = 880)
    await sharp(backup)
      .extract({ left: 0, top: 140, width: 1920, height: 880 })
      .toFile(file);
      
    console.log('Cropped ' + file);
  }
}

run().catch(console.error);
