const { useMutation, UseMutationOptions } = require("react-query");
const { createGuild } = require("services/guild");

/**
 * @param  {UseMutationOptions} options
 */
const useCreateGuild = (options) => useMutation((data) => createGuild(data), {...options})

export default useCreateGuild