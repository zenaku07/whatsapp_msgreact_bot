// Function to react to personal messages with a thumb emoji
async function reactToMessage(msg) {
    try {
      // React to personal messages with a thumb emoji
      const reaction = await msg.react('🟡');
      console.log('Reaction added:', reaction);
    } catch (error) {
      console.error('Error handling reaction:', error);
    }
  }
  
  module.exports = {
    reactToMessage,
  };
  