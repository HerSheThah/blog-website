// images list from online
exports.getimages = function()
{
  let images_list = [
    'https://images.unsplash.com/photo-1485217988980-11786ced9454?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    'https://images.unsplash.com/photo-1484627147104-f5197bcd6651?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZyUyMG5hdHVyZXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8YmFja2dyb3VuZHxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1621757787548-4d0cc5a6bf71?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG5pZ2h0JTIwdHJhdmVsfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1496429862132-5ab36b6ae330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Zmx5fGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFydHl8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGV4ZXJjaXNlfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1465311440653-ba9b1d9b0f5b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZXhwbG9yZXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1425342605259-25d80e320565?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGV4cGxvcmV8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1607624963303-407b77e96d0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzeSUyMHJvYWR8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvbmV8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bXVzaWN8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1529229504105-4ea795dcbf59?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZGFuY2V8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1612487458970-564127ec86f5?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
]
return images_list;
}

// today's date and time
exports.getdate = function()
{
  let today = new Date();
  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  let day = today.toLocaleDateString("en-US", options);
  return day;
}


exports.getblogsteps = function()
{
  let blog_steps =[
    {
      title: "Answer questions",
      para:"Your readers have questions. Use a specific question as the title of your blog post. The answer to the question is your blog post content."
    },
    {
      title: "Create an outline prior to writing",
      para: "Don’t sit down to write a blog post without creating a framework. The outline will be your guide and make it much easier to keep the flow of your blog post moving forward."
    },
    {
      title: "When writing your blog post, don’t stop writing until you’re 100 percent finished",
      para: "This was my biggest mistake. Get your blog post on paper, no matter how ugly it looks. Once you’re finished, go back and edit. Do NOT edit while you write. It will slow you down and interrupt your flow. Use Grammarly AFTER you’ve got your blog post on paper."
    },
    {
      title: "Write five hundred words, minimum. Fifteen hundred words is ideal",
      para: "I realize fifteen hundred words may seem like an impossible task when you first start writing, but I promise it’s not. Study after study shows longer blog posts attract more links, likes, and shares.",
    },
    {
      title: "Be passionate in your writing",
      para: "People respond to emotion. Aim for creating some kind of emotional reaction with your reader.",
    },
    {
      title: "Write as if you’re speaking to ONE reader",
      para: "Don’t write to an audience. Act is if you’re talking to ONE person and write accordingly."
    },
    {
      title: "Be honest, humble, and personable",
      para:  "Nobody likes a know-it-all. The more personality you can show in a blog post, the better. You’re not writing for your college English professor. You’re writing for the amusement of the reader. That’s a big difference."
    },
    {
      title: "Use a kitchen timer or unplug your laptop to create a sense of urgency",
      para: "I don’t believe in “writer’s block.” However, I do believe in “writer’s procrastination.” I avoid procrastination by playing a game with myself. I unplug my laptop and start writing. I have an older laptop with a short battery life (about seventy minutes). I must finish my blog post before the laptop dies. If you have writer’s procrastination too, try playing this game. You’ll love it.",
    },
    {
      title: "Solve problems",
      para: "People have all kinds of different problems. If your blog post solves a problem, you’ve provided value to your reader."
    },
    {
      title: "Have fun!",
      para: "Blogging is like working out. If you avoid it and have a bad attitude, blogging becomes like a chore you never want to finish. However, if you have a good attitude and realize that blogging is not a life-or-death exercise, you’ll have fun and look forward to blogging every day!"
    }
  ];
  return blog_steps;
}
