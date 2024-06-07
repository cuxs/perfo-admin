export default () => {
  return async (ctx, next) => {
    let user;
    let userTeam

    ctx.state.teams.forEach(team=>{
      const tentativeUser = team.users.find(user=>user.player_match_position ===ctx.request.params.playerMatchPosition)
      if(tentativeUser){
        user = tentativeUser
        userTeam = team
      }
    })

    if(user){
      ctx.state.autogeneratedUserInstance = {...user, team: userTeam}
      return next()
    }else{
      ctx.status = 400
      ctx.message = 'No user instance found. The user may already be assigned.'
    } 
  };
};
