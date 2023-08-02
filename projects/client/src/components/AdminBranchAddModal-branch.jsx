import { Box, Flex, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react"
import "../css/adminBranchR.css"

export default function AddBranch (){
    return (
        <>
         <Flex className="flex3R-input_branch-addbranch">
                        <Box className="flex3R-input-box-addbranch">Cabang</Box>
                        <FormControl>
                            <FormLabel>Nama Cabang</FormLabel>
                            <Input  transition={"1s"}  _hover={{borderColor : "green", boxShadow : "dark-lg"}} ></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Alamat Cabang</FormLabel>
                            {/* <Input transition={"1s"}  _hover={{borderColor : "green", boxShadow : "dark-lg"}} ></Input> */}
                            <Textarea name="" id="" cols="30" rows="2" resize={"none"} size={"sm"}></Textarea>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Kecamatan</FormLabel>
                            <Input  transition={"1s"}  _hover={{borderColor : "green", boxShadow : "dark-lg"}} ></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Kota</FormLabel>
                            <Input  transition={"1s"}  _hover={{borderColor : "green", boxShadow : "dark-lg"}} ></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Provinsi</FormLabel>
                            <Input className="input-addbranch"  transition={"1s"}  _hover={{borderColor : "green", boxShadow : "dark-lg"}} ></Input>
                        </FormControl>
                    </Flex>
                    

        </>
    )
}